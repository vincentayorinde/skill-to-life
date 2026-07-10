import {
  Injectable,
  Logger,
  OnModuleInit,
  ServiceUnavailableException,
} from '@nestjs/common';
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
  readonly defaultSystemPrompt = DEFAULT_SYSTEM_PROMPT;

  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit(): Promise<void> {
    await this.seedDefaultConfig();
  }

  async getActiveConfig() {
    return this.prisma.aiConfig.findFirst({ where: { isActive: true } });
  }

  async getProvider(): Promise<'claude' | 'openai' | 'gemini'> {
    const config = await this.getAvailableProvider();
    return config.provider as 'claude' | 'openai' | 'gemini';
  }

  async getAvailableProvider(): Promise<{
    provider: string;
    model: string;
    systemPrompt: string;
  }> {
    const hasClaudeKey = !!process.env['ANTHROPIC_API_KEY'];
    const hasOpenAIKey = !!process.env['OPENAI_API_KEY'];
    const hasGeminiKey = !!process.env['GEMINI_API_KEY'];

    const config = await this.getActiveConfig();
    const systemPrompt = config?.systemPrompt ?? this.defaultSystemPrompt;

    const candidates: Array<{ provider: string; model: string }> = [];

    if (hasClaudeKey) {
      candidates.push({
        provider: 'claude',
        model: 'claude-opus-4-20250514',
      });
    }
    if (hasOpenAIKey) {
      candidates.push({
        provider: 'openai',
        model: 'gpt-4o',
      });
    }
    if (hasGeminiKey) {
      candidates.push({
        provider: 'gemini',
        model: 'gemini-1.5-pro',
      });
    }

    if (candidates.length === 0) {
      throw new ServiceUnavailableException(
        'No AI provider configured. Add at least one of ANTHROPIC_API_KEY, OPENAI_API_KEY, or GEMINI_API_KEY to enable CV analysis.',
      );
    }

    for (const candidate of candidates) {
      const hasCredit = await this.checkProviderCredit(candidate.provider);

      if (hasCredit) {
        this.logger.log(`Using AI provider: ${candidate.provider}`);
        return {
          provider: candidate.provider,
          model: candidate.model,
          systemPrompt,
        };
      }

      this.logger.warn(
        `Provider ${candidate.provider} has no credit or is unavailable. Trying next provider.`,
      );
    }

    throw new ServiceUnavailableException(
      'All configured AI providers are currently unavailable or have insufficient credit. Please check your API key balances.',
    );
  }

  async getProviderStatus(): Promise<{
    providers: Array<{
      name: string;
      hasKey: boolean;
      status: 'available' | 'no_key' | 'unknown';
    }>;
    activeProvider: string | null;
  }> {
    const providers = [
      { name: 'claude', envKey: 'ANTHROPIC_API_KEY' },
      { name: 'openai', envKey: 'OPENAI_API_KEY' },
      { name: 'gemini', envKey: 'GEMINI_API_KEY' },
    ];

    const results = providers.map((provider) => ({
      name: provider.name,
      hasKey: !!process.env[provider.envKey],
      status: process.env[provider.envKey]
        ? ('unknown' as const)
        : ('no_key' as const),
    }));

    const activeProvider =
      results.find((provider) => provider.hasKey)?.name ?? null;

    return {
      providers: results,
      activeProvider,
    };
  }

  private async checkProviderCredit(provider: string): Promise<boolean> {
    try {
      switch (provider) {
        case 'claude': {
          const Anthropic = await import('@anthropic-ai/sdk');
          const client = new Anthropic.default({
            apiKey: process.env['ANTHROPIC_API_KEY'],
          });
          await client.messages.create({
            model: 'claude-haiku-4-5',
            max_tokens: 1,
            messages: [{ role: 'user', content: 'hi' }],
          });
          return true;
        }

        case 'openai': {
          const OpenAI = await import('openai');
          const client = new OpenAI.default({
            apiKey: process.env['OPENAI_API_KEY'],
          });
          await client.chat.completions.create({
            model: 'gpt-4o-mini',
            max_tokens: 1,
            messages: [{ role: 'user', content: 'hi' }],
          });
          return true;
        }

        case 'gemini': {
          const { GoogleGenerativeAI } = await import('@google/generative-ai');
          const client = new GoogleGenerativeAI(
            process.env['GEMINI_API_KEY'] ?? '',
          );
          const model = client.getGenerativeModel({
            model: 'gemini-1.5-flash',
          });
          await model.generateContent('hi');
          return true;
        }

        default:
          return false;
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message.toLowerCase()
          : String(error).toLowerCase();

      const isCreditError =
        message.includes('credit') ||
        message.includes('quota') ||
        message.includes('billing') ||
        message.includes('insufficient') ||
        message.includes('rate_limit') ||
        message.includes('429') ||
        message.includes('402');

      if (isCreditError) {
        this.logger.warn(
          `Provider ${provider} has insufficient credit: ${message}`,
        );
        return false;
      }

      this.logger.warn(`Provider ${provider} check failed: ${message}`);
      return false;
    }
  }

  private async seedDefaultConfig(): Promise<void> {
    const existing = await this.prisma.aiConfig.findFirst({
      where: { isActive: true },
    });
    if (existing) return;

    try {
      await this.prisma.aiConfig.create({
        data: {
          // Note: provider and model fields in AiConfig are now used as
          // defaults only. Actual provider selection is handled dynamically by
          // getAvailableProvider() based on which API keys are present and
          // which have credit.
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
