import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProfileService } from '../profile/profile.service';
import { AiConfigService } from '../ai-config/ai-config.service';
import { CvAnalysisProcessor } from './cv-analysis.processor';

const pdfParse = require('pdf-parse') as (
  buf: Buffer,
) => Promise<{ text?: string }>;

export interface CvUploadFile {
  mimetype: string;
  buffer: Buffer;
  originalname: string;
}

@Injectable()
export class CvAnalysisService {
  private readonly logger = new Logger(CvAnalysisService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly profileService: ProfileService,
    private readonly aiConfigService: AiConfigService,
    private readonly processor: CvAnalysisProcessor,
  ) {}

  async analyseFromFile(userId: string, file: CvUploadFile) {
    if (file.mimetype !== 'application/pdf') {
      throw new BadRequestException('Please upload a PDF file.');
    }

    const text = await this.extractPdfText(file.buffer);

    return this.runAnalysis(userId, text, 'file', file.originalname);
  }

  async extractPdfText(buffer: Buffer): Promise<string> {
    try {
      const parsed = await pdfParse(buffer);
      const text = parsed.text?.trim() ?? '';
      if (text.length >= 50) return text;
    } catch (error) {
      this.logger.warn('pdf-parse failed, trying pdfjs fallback', error);
    }

    try {
      const text = await this.extractWithPdfjs(buffer);
      if (text.length >= 50) return text;
    } catch (error) {
      this.logger.error('Both PDF parsers failed', error);
    }

    throw new BadRequestException(
      'We could not extract text from this PDF. It may be image-based or scanned. Please paste your CV as text instead.',
    );
  }

  private async extractWithPdfjs(buffer: Buffer): Promise<string> {
    const pdfjs = (await import('pdfjs-dist/legacy/build/pdf.mjs')) as {
      getDocument: (params: { data: Uint8Array }) => {
        promise: Promise<{
          numPages: number;
          getPage: (pageNumber: number) => Promise<{
            getTextContent: () => Promise<{
              items: Array<{ str?: string }>;
            }>;
          }>;
        }>;
      };
    };
    const doc = await pdfjs.getDocument({ data: new Uint8Array(buffer) })
      .promise;

    let text = '';
    for (let i = 1; i <= doc.numPages; i += 1) {
      const page = await doc.getPage(i);
      const content = await page.getTextContent();
      text += `${content.items.map((item) => item.str ?? '').join(' ')}\n`;
    }
    return text.trim();
  }

  async analyseFromText(userId: string, text: string) {
    if (!text || text.trim().length < 100) {
      throw new BadRequestException(
        'Please provide more detail about your experience for an accurate analysis.',
      );
    }
    if (text.length > 10000) {
      throw new BadRequestException('CV text must be under 10,000 characters.');
    }
    return this.runAnalysis(userId, text.trim(), 'text');
  }

  async analyseFromLinkedIn(userId: string, linkedinUrl: string) {
    let profileText: string;
    try {
      const res = await fetch(linkedinUrl, {
        headers: { 'User-Agent': 'SkillToLife/1.0' },
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const html = await res.text();
      // Extract readable text from HTML (basic — LinkedIn blocks scrapers)
      profileText = html
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    } catch {
      throw new ServiceUnavailableException(
        'We could not access that LinkedIn URL. Make sure the profile is public, or paste your CV text instead.',
      );
    }

    return this.runAnalysis(
      userId,
      profileText,
      'linkedin',
      undefined,
      linkedinUrl,
    );
  }

  async getAnalyses(userId: string) {
    const profile = await this.profileService.findOrCreate(userId);
    return this.prisma.cvAnalysis.findMany({
      where: { profileId: profile.id },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getAnalysis(userId: string, id: string) {
    const profile = await this.profileService.findOrCreate(userId);
    const analysis = await this.prisma.cvAnalysis.findFirst({
      where: { id, profileId: profile.id },
    });
    if (!analysis) throw new NotFoundException('Analysis not found');
    return analysis;
  }

  private async runAnalysis(
    userId: string,
    cvText: string,
    inputType: string,
    fileName?: string,
    linkedinUrl?: string,
  ) {
    const profile = await this.profileService.findOrCreate(userId);
    const config = await this.aiConfigService.getActiveConfig();
    const aiModel = config?.model ?? 'claude-opus-4-20250514';

    const result = await this.processor.analyseCV(cvText);

    return this.prisma.cvAnalysis.create({
      data: {
        profileId: profile.id,
        inputType,
        rawInput: cvText,
        fileName: fileName ?? null,
        linkedinUrl: linkedinUrl ?? null,
        aiModel,
        profileScore: (result['profileScore'] as number) ?? 0,
        topMatches: result['topMatches'] as object,
        strengths: result['strengths'] as object,
        gaps: result['gaps'] as object,
        improvements: result['improvements'] as object,
        recommendedCareers: result['recommendedCareers'] as object,
        fullAnalysis: JSON.stringify(result),
      },
    });
  }
}
