import { CvAnalysisProcessor } from './cv-analysis.processor';
import { AiConfigService } from '../ai-config/ai-config.service';

const ORIGINAL_ENV = process.env;

describe('CvAnalysisProcessor', () => {
  let processor: CvAnalysisProcessor;

  beforeEach(() => {
    process.env = { ...ORIGINAL_ENV };
    delete process.env['ANTHROPIC_API_KEY'];
    delete process.env['OPENAI_API_KEY'];
    delete process.env['GEMINI_API_KEY'];

    processor = new CvAnalysisProcessor({
      getAvailableProvider: jest.fn(),
    } as unknown as AiConfigService);
  });

  afterEach(() => {
    process.env = ORIGINAL_ENV;
  });

  it('getRemainingProviders excludes the used provider', () => {
    process.env['ANTHROPIC_API_KEY'] = 'key';
    process.env['OPENAI_API_KEY'] = 'key';
    process.env['GEMINI_API_KEY'] = 'key';

    const remaining = (
      processor as unknown as {
        getRemainingProviders(
          provider: string,
        ): Array<{ provider: string; model: string }>;
      }
    ).getRemainingProviders('claude');

    expect(remaining.map((provider) => provider.provider)).toEqual([
      'openai',
      'gemini',
    ]);
  });

  it('getRemainingProviders only includes providers with keys', () => {
    process.env['GEMINI_API_KEY'] = 'key';

    const remaining = (
      processor as unknown as {
        getRemainingProviders(
          provider: string,
        ): Array<{ provider: string; model: string }>;
      }
    ).getRemainingProviders('openai');

    expect(remaining).toEqual([
      { provider: 'gemini', model: 'gemini-1.5-pro' },
    ]);
  });

  it('parseResponse extracts JSON from inside prose', () => {
    const parsed = (
      processor as unknown as {
        parseResponse(raw: string): Record<string, unknown>;
      }
    ).parseResponse('Here is the result: {"profileScore":77} Thanks.');

    expect(parsed).toEqual({ profileScore: 77 });
  });
});
