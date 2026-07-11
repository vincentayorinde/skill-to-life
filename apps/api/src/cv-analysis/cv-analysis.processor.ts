import {
  BadRequestException,
  Injectable,
  Logger,
  ServiceUnavailableException,
} from '@nestjs/common';
import { AiConfigService } from '../ai-config/ai-config.service';
import { ClaudeProvider } from './providers/claude.provider';
import { GeminiProvider } from './providers/gemini.provider';
import { OpenAIProvider } from './providers/openai.provider';

const USER_PROMPT_TEMPLATE = (cvText: string) => `Analyse this CV/profile and return a JSON career assessment:

--- CV START ---
${cvText}
--- CV END ---

Be honest and specific. If the CV is weak, say so with a low score and clear improvements. If it is strong for certain paths, highlight exactly why.

Return top 5 career matches, at least 3 strengths, at least 3 gaps, and at least 5 prioritised improvements.`;

@Injectable()
export class CvAnalysisProcessor {
  private readonly logger = new Logger(CvAnalysisProcessor.name);

  constructor(private readonly aiConfigService: AiConfigService) {}

  async analyseCV(cvText: string): Promise<Record<string, unknown>> {
    if (cvText.trim().length < 100) {
      throw new BadRequestException(
        'Please provide more detail about your experience for an accurate analysis.',
      );
    }

    const config = await this.aiConfigService.getAvailableProvider();
    const userPrompt = this.buildUserPrompt(cvText);
    const providers = this.getRemainingProviders(config.provider);

    let raw: string | null = null;
    let lastError: Error | null = null;

    try {
      const provider = this.buildProvider(config.provider, config.model);
      raw = await provider.analyse(userPrompt, config.systemPrompt);
    } catch (err) {
      this.logger.error(
        `Primary provider ${config.provider} failed during analysis`,
        err,
      );
      lastError = err as Error;
    }

    if (raw === null) {
      for (const fallback of providers) {
        try {
          this.logger.warn(`Falling back to ${fallback.provider}`);
          const provider = this.buildProvider(fallback.provider, fallback.model);
          raw = await provider.analyse(userPrompt, config.systemPrompt);
          break;
        } catch (err) {
          this.logger.error(
            `Fallback provider ${fallback.provider} also failed`,
            err,
          );
          lastError = err as Error;
        }
      }
    }

    if (raw === null) {
      this.logger.error('All providers failed. Last error:', lastError);
      throw new ServiceUnavailableException(
        'Analysis failed across all configured providers. Please try again later.',
      );
    }

    return this.parseResponse(raw);
  }

  private getRemainingProviders(
    usedProvider: string,
  ): Array<{ provider: string; model: string }> {
    const all = [
      {
        provider: 'claude',
        model: process.env['CLAUDE_MODEL'] ?? 'claude-opus-4-20250514',
        envKey: 'ANTHROPIC_API_KEY',
      },
      {
        provider: 'openai',
        model: process.env['OPENAI_MODEL'] ?? 'gpt-4o',
        envKey: 'OPENAI_API_KEY',
      },
      {
        provider: 'gemini',
        model: process.env['GEMINI_MODEL'] ?? 'gemini-flash-latest',
        envKey: 'GEMINI_API_KEY',
      },
    ];

    return all
      .filter(
        (provider) =>
          provider.provider !== usedProvider &&
          this.aiConfigService.isValidKey(process.env[provider.envKey]),
      )
      .map(({ provider, model }) => ({ provider, model }));
  }

  private buildProvider(provider: string, model: string) {
    switch (provider) {
      case 'openai':
        return new OpenAIProvider(model || 'gpt-4o');
      case 'gemini':
        return new GeminiProvider(model || 'gemini-flash-latest');
      default:
        return new ClaudeProvider(model || 'claude-opus-4-20250514');
    }
  }

  private buildUserPrompt(cvText: string): string {
    return USER_PROMPT_TEMPLATE(cvText);
  }

  private parseResponse(raw: string): Record<string, unknown> {
    // Strip markdown fences if the model included them despite instructions
    const stripped = raw
      .replace(/^```(?:json)?\s*/i, '')
      .replace(/\s*```\s*$/, '')
      .trim();

    try {
      return JSON.parse(stripped) as Record<string, unknown>;
    } catch {
      const jsonMatch = raw.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          return JSON.parse(jsonMatch[0]) as Record<string, unknown>;
        } catch {
          // Fall through to the shared parse error.
        }
      }

      this.logger.error(
        'Failed to parse AI response as JSON',
        raw.slice(0, 200),
      );
      throw new ServiceUnavailableException(
        'Analysis failed. Please try again in a moment.',
      );
    }
  }
}
