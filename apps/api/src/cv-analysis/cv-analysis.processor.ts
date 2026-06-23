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

    const config = await this.aiConfigService.getActiveConfig();
    if (!config) {
      throw new ServiceUnavailableException(
        'No AI provider configured. Please add an API key to enable CV analysis.',
      );
    }

    const hasKey = this.hasApiKey(config.provider);
    if (!hasKey) {
      throw new ServiceUnavailableException(
        'CV analysis is not available right now. Please try again later.',
      );
    }

    const provider = this.buildProvider(config.provider, config.model);
    const userPrompt = USER_PROMPT_TEMPLATE(cvText);

    let raw: string;
    try {
      raw = await provider.analyse(userPrompt, config.systemPrompt);
    } catch (err) {
      this.logger.error('AI provider error', err);
      throw new ServiceUnavailableException(
        'Analysis failed. Please try again in a moment.',
      );
    }

    return this.parseJsonResponse(raw);
  }

  private hasApiKey(provider: string): boolean {
    switch (provider) {
      case 'claude':
        return !!process.env['ANTHROPIC_API_KEY'];
      case 'openai':
        return !!process.env['OPENAI_API_KEY'];
      case 'gemini':
        return !!process.env['GEMINI_API_KEY'];
      default:
        return false;
    }
  }

  private buildProvider(provider: string, model: string) {
    switch (provider) {
      case 'openai':
        return new OpenAIProvider(model || 'gpt-4o');
      case 'gemini':
        return new GeminiProvider(model || 'gemini-1.5-pro');
      default:
        return new ClaudeProvider(model || 'claude-opus-4-20250514');
    }
  }

  private parseJsonResponse(raw: string): Record<string, unknown> {
    // Strip markdown fences if the model included them despite instructions
    const stripped = raw
      .replace(/^```(?:json)?\s*/i, '')
      .replace(/\s*```\s*$/, '')
      .trim();

    try {
      return JSON.parse(stripped) as Record<string, unknown>;
    } catch {
      this.logger.error('Failed to parse AI response as JSON', raw.slice(0, 200));
      throw new ServiceUnavailableException(
        'Analysis failed. Please try again in a moment.',
      );
    }
  }
}
