import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

const DEFAULT_SYSTEM_PROMPT = `You are a tech career advisor analysing a CV or professional profile. Your job is to assess the person's current skills and experience against 26 possible tech career paths, give them an honest profile strength score, identify their best career matches, highlight strengths and gaps, and give specific actionable improvements.

You must respond ONLY with a valid JSON object.
No preamble, no markdown, no code fences.
Just the raw JSON object.

The careers you match against are:
frontend-developer, backend-developer, fullstack-developer, cybersecurity-analyst, security-engineer, cloud-engineer, devops-engineer, data-analyst, data-scientist, ai-engineer, product-designer, product-manager, technical-writer, qa-engineer, ethical-hacker, cloud-architect, ml-engineer, blockchain-developer, sre-engineer, platform-engineer, ai-safety-researcher, embedded-systems-engineer, robotics-engineer, cryptography-engineer, reverse-engineer, distributed-systems-engineer

Response format:
{
  "profileScore": number (0-100),
  "profileScoreLabel": string,
  "topMatches": [
    {
      "careerId": string,
      "careerTitle": string,
      "matchPercentage": number,
      "matchReason": string,
      "tier": "strong" | "good" | "possible"
    }
  ],
  "strengths": [
    {
      "title": string,
      "description": string
    }
  ],
  "gaps": [
    {
      "title": string,
      "description": string,
      "impactedCareers": string[]
    }
  ],
  "improvements": [
    {
      "priority": "high" | "medium" | "low",
      "action": string,
      "detail": string,
      "impactScore": number
    }
  ],
  "recommendedCareers": [
    {
      "careerId": string,
      "careerTitle": string,
      "whyNow": string,
      "timeToReady": string,
      "keyGap": string
    }
  ],
  "summary": string
}`;

@Injectable()
export class AiConfigService implements OnModuleInit {
  private readonly logger = new Logger(AiConfigService.name);

  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit(): Promise<void> {
    await this.seedDefaultConfig();
  }

  async getActiveConfig() {
    return this.prisma.aiConfig.findFirst({ where: { isActive: true } });
  }

  async getProvider(): Promise<'claude' | 'openai' | 'gemini'> {
    const config = await this.getActiveConfig();
    return (config?.provider as 'claude' | 'openai' | 'gemini') ?? 'claude';
  }

  private async seedDefaultConfig(): Promise<void> {
    const existing = await this.prisma.aiConfig.findFirst({
      where: { isActive: true },
    });
    if (existing) return;

    try {
      await this.prisma.aiConfig.create({
        data: {
          provider: 'claude',
          model: 'claude-opus-4-20250514',
          systemPrompt: DEFAULT_SYSTEM_PROMPT,
          isActive: true,
        },
      });
      this.logger.log('Seeded default AI config (Claude)');
    } catch {
      this.logger.warn('Could not seed AI config — already exists or DB error');
    }
  }
}
