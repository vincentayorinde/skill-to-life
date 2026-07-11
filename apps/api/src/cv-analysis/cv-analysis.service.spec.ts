import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AiConfigService } from '../ai-config/ai-config.service';
import { PrismaService } from '../prisma/prisma.service';
import { ProfileService } from '../profile/profile.service';
import { CvAnalysisProcessor } from './cv-analysis.processor';
import { CvAnalysisService, CvUploadFile } from './cv-analysis.service';

jest.mock('pdf-parse', () => jest.fn());

const pdfParse = jest.requireMock('pdf-parse') as jest.Mock;

const mockProfile = { id: 'prof1', userId: 'user1' };
const mockConfig = {
  provider: 'claude',
  model: 'claude-opus-4-20250514',
  systemPrompt: '',
};

const analysisResult = {
  profileScore: 72,
  topMatches: [],
  strengths: [],
  gaps: [],
  improvements: [],
  recommendedCareers: [],
  fullAnalysis: '{}',
};

const mockPrisma = {
  cvAnalysis: {
    create: jest.fn().mockResolvedValue({
      id: 'analysis1',
      ...analysisResult,
      createdAt: new Date(),
    }),
    findMany: jest.fn().mockResolvedValue([]),
    findFirst: jest.fn(),
  },
};

const mockProfileService = {
  findOrCreate: jest.fn().mockResolvedValue(mockProfile),
};
const mockAiConfigService = {
  getActiveConfig: jest.fn().mockResolvedValue(mockConfig),
};
const mockProcessor = {
  analyseCV: jest.fn().mockResolvedValue(analysisResult),
};

describe('CvAnalysisService', () => {
  let service: CvAnalysisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CvAnalysisService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: ProfileService, useValue: mockProfileService },
        { provide: AiConfigService, useValue: mockAiConfigService },
        { provide: CvAnalysisProcessor, useValue: mockProcessor },
      ],
    }).compile();

    service = module.get<CvAnalysisService>(CvAnalysisService);
    jest.clearAllMocks();
    pdfParse.mockReset();
    mockProfileService.findOrCreate.mockResolvedValue(mockProfile);
    mockAiConfigService.getActiveConfig.mockResolvedValue(mockConfig);
    mockProcessor.analyseCV.mockResolvedValue(analysisResult);
    mockPrisma.cvAnalysis.create.mockResolvedValue({
      id: 'analysis1',
      ...analysisResult,
      createdAt: new Date(),
    });
  });

  describe('analyseFromFile', () => {
    it('rejects non-PDF files', async () => {
      const file = {
        mimetype: 'image/jpeg',
        buffer: Buffer.from(''),
        originalname: 'photo.jpg',
      } as CvUploadFile;
      await expect(service.analyseFromFile('user1', file)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('rejects PDF with no extractable text', async () => {
      pdfParse.mockResolvedValue({ text: '' });
      jest
        .spyOn(
          service as unknown as { extractWithPdfjs: () => Promise<string> },
          'extractWithPdfjs',
        )
        .mockResolvedValue('');
      const file = {
        mimetype: 'application/pdf',
        buffer: Buffer.from(''),
        originalname: 'empty.pdf',
      } as CvUploadFile;
      await expect(service.analyseFromFile('user1', file)).rejects.toThrow(
        BadRequestException,
      );
    });

    it('extracts text from a valid PDF', async () => {
      const cvText =
        'Experienced software engineer with TypeScript, cloud delivery, product thinking, and mentoring experience.';
      pdfParse.mockResolvedValue({ text: cvText });

      const file = {
        mimetype: 'application/pdf',
        buffer: Buffer.from('%PDF valid text'),
        originalname: 'cv.pdf',
      } as CvUploadFile;

      await service.analyseFromFile('user1', file);

      expect(mockProcessor.analyseCV).toHaveBeenCalledWith(cvText);
      expect(mockPrisma.cvAnalysis.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            rawInput: cvText,
            fileName: 'cv.pdf',
          }),
        }),
      );
    });

    it('uses pdfjs fallback when pdf-parse fails', async () => {
      const fallbackText =
        'Fallback extracted CV text with enough detail about experience, projects, skills, and career goals.';
      pdfParse.mockRejectedValue(new Error('pdf-parse failed'));
      jest
        .spyOn(
          service as unknown as { extractWithPdfjs: () => Promise<string> },
          'extractWithPdfjs',
        )
        .mockResolvedValue(fallbackText);

      const text = await service.extractPdfText(Buffer.from('%PDF fallback'));

      expect(text).toBe(fallbackText);
    });

    it('throws a clear error for image-based PDFs', async () => {
      pdfParse.mockResolvedValue({ text: 'scan' });
      jest
        .spyOn(
          service as unknown as { extractWithPdfjs: () => Promise<string> },
          'extractWithPdfjs',
        )
        .mockResolvedValue('');

      await expect(
        service.extractPdfText(Buffer.from('%PDF scanned')),
      ).rejects.toThrow(
        'We could not extract text from this PDF. It may be image-based or scanned. Please paste your CV as text instead.',
      );
    });
  });

  describe('analyseFromText', () => {
    it('rejects text under 100 chars', async () => {
      await expect(
        service.analyseFromText('user1', 'too short'),
      ).rejects.toThrow(BadRequestException);
    });

    it('rejects text over 10000 chars', async () => {
      await expect(
        service.analyseFromText('user1', 'x'.repeat(10001)),
      ).rejects.toThrow(BadRequestException);
    });

    it('runs analysis for valid text', async () => {
      const result = await service.analyseFromText('user1', 'x'.repeat(200));
      expect(result.id).toBe('analysis1');
      expect(mockProcessor.analyseCV).toHaveBeenCalled();
    });
  });

  describe('getAnalyses', () => {
    it('returns analyses for current user profile', async () => {
      mockPrisma.cvAnalysis.findMany.mockResolvedValue([{ id: 'a1' }]);
      const results = await service.getAnalyses('user1');
      expect(results).toHaveLength(1);
    });
  });
});
