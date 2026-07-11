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
    const claudeKey = process.env['ANTHROPIC_API_KEY'];
    const openaiKey = process.env['OPENAI_API_KEY'];
    const geminiKey = process.env['GEMINI_API_KEY'];

    const config = await this.getActiveConfig();
    const systemPrompt = config?.systemPrompt ?? this.defaultSystemPrompt;

    const candidates: Array<{ provider: string; model: string }> = [];

    if (this.isValidKey(claudeKey)) {
      candidates.push({
        provider: 'claude',
        model: process.env['CLAUDE_MODEL'] ?? 'claude-opus-4-20250514',
      });
    }
    if (this.isValidKey(openaiKey)) {
      candidates.push({
        provider: 'openai',
        model: process.env['OPENAI_MODEL'] ?? 'gpt-4o',
      });
    }
    if (this.isValidKey(geminiKey)) {
      candidates.push({
        provider: 'gemini',
        model: process.env['GEMINI_MODEL'] ?? 'gemini-flash-latest',
      });
    }

    if (candidates.length === 0) {
      this.logger.error(
        'No valid AI provider keys found. Check ANTHROPIC_API_KEY, OPENAI_API_KEY, GEMINI_API_KEY are real keys, not placeholders.',
      );
      throw new ServiceUnavailableException(
        'CV analysis is not available right now. No AI provider is configured.',
      );
    }

    this.logger.log(
      `Valid providers available: ${candidates.map((c) => c.provider).join(', ')}`,
    );

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

  isValidKey(key: string | undefined): boolean {
    if (!key) return false;

    const trimmed = key.trim();

    if (trimmed.length < 20) return false;

    const placeholders = [
      'your-key',
      'your-api-key',
      'sk-your-key',
      'sk-...',
      'placeholder',
      'changeme',
      'xxx',
      'todo',
      'example',
    ];

    const lower = trimmed.toLowerCase();
    for (const placeholder of placeholders) {
      if (lower.includes(placeholder)) {
        return false;
      }
    }

    return true;
  }

  async getProviderStatus(): Promise<{
    providers: Array<{
      name: string;
      configured: boolean;
      status: 'no_key' | 'invalid_or_placeholder' | 'ready';
    }>;
    activeProvider: string | null;
  }> {
    const providers = [
      { name: 'claude', envKey: 'ANTHROPIC_API_KEY' },
      { name: 'openai', envKey: 'OPENAI_API_KEY' },
      { name: 'gemini', envKey: 'GEMINI_API_KEY' },
    ];

    const results = providers.map((provider) => {
      const key = process.env[provider.envKey];
      const valid = this.isValidKey(key);
      return {
        name: provider.name,
        configured: valid,
        status: !key
          ? ('no_key' as const)
          : !valid
            ? ('invalid_or_placeholder' as const)
            : ('ready' as const),
      };
    });

    const activeProvider =
      results.find((provider) => provider.configured)?.name ?? null;

    return {
      providers: results,
      activeProvider,
    };
  }

  async debugAllProviders(): Promise<Record<string, unknown>> {
    const results: Record<string, unknown> = {};
    const providers = ['claude', 'openai', 'gemini'];

    for (const provider of providers) {
      const envKey =
        provider === 'claude'
          ? 'ANTHROPIC_API_KEY'
          : provider === 'openai'
            ? 'OPENAI_API_KEY'
            : 'GEMINI_API_KEY';

      if (!process.env[envKey]) {
        results[provider] = {
          hasKey: false,
          status: 'no key',
        };
        continue;
      }

      try {
        await this.pingProvider(provider);
        results[provider] = {
          hasKey: true,
          status: 'working',
        };
      } catch (error) {
        results[provider] = {
          hasKey: true,
          status: 'failed',
          error: error instanceof Error ? error.message : String(error),
        };
      }
    }

    return results;
  }

  private async checkProviderCredit(provider: string): Promise<boolean> {
    try {
      await this.pingProvider(provider);
      return true;
    } catch (error: unknown) {
      const fullMessage =
        error instanceof Error ? error.message : String(error);

      this.logger.error(`Provider ${provider} credit check failed with full error:`, {
        message: fullMessage,
        stack: error instanceof Error ? error.stack : undefined,
        provider,
      });

      const message =
        error instanceof Error
          ? error.message.toLowerCase()
          : String(error).toLowerCase();

      const isCreditError =
        message.includes('insufficient') ||
        message.includes('quota exceeded') ||
        message.includes('billing') ||
        message.includes('exceeded your current quota') ||
        message.includes('429');

      if (isCreditError) {
        this.logger.warn(`Provider ${provider} genuinely out of credit`);
        return false;
      }

      this.logger.warn(
        `Provider ${provider} check inconclusive — will attempt analysis anyway`,
      );
      return true;
    }
  }

  private async pingProvider(provider: string): Promise<void> {
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
        return;
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
        return;
      }

      case 'gemini': {
        const { GoogleGenerativeAI } = await import('@google/generative-ai');
        const client = new GoogleGenerativeAI(
          process.env['GEMINI_API_KEY'] ?? '',
        );
        const model = client.getGenerativeModel({
          model: 'gemini-flash-latest',
        });
        await model.generateContent('hi');
        return;
      }

      default:
        throw new Error(`Unknown AI provider: ${provider}`);
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
          model: process.env['CLAUDE_MODEL'] ?? 'claude-opus-4-20250514',
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
