import { ServiceUnavailableException } from '@nestjs/common';
import { AiConfigService } from './ai-config.service';
import { PrismaService } from '../prisma/prisma.service';

const ORIGINAL_ENV = process.env;
const REAL_KEY = 'sk-real1234567890abcdefghij';

describe('AiConfigService', () => {
  let service: AiConfigService;
  let prisma: { aiConfig: { findFirst: jest.Mock; create: jest.Mock } };

  beforeEach(() => {
    process.env = { ...ORIGINAL_ENV };
    delete process.env['ANTHROPIC_API_KEY'];
    delete process.env['OPENAI_API_KEY'];
    delete process.env['GEMINI_API_KEY'];
    delete process.env['CLAUDE_MODEL'];
    delete process.env['OPENAI_MODEL'];
    delete process.env['GEMINI_MODEL'];

    prisma = {
      aiConfig: {
        findFirst: jest.fn().mockResolvedValue({
          systemPrompt: 'stored prompt',
        }),
        create: jest.fn(),
      },
    };
    service = new AiConfigService(prisma as unknown as PrismaService);
    jest
      .spyOn(
        service as unknown as {
          checkProviderCredit(provider: string): Promise<boolean>;
        },
        'checkProviderCredit',
      )
      .mockResolvedValue(true);
  });

  afterEach(() => {
    process.env = ORIGINAL_ENV;
    jest.restoreAllMocks();
  });

  it('returns claude when only ANTHROPIC_API_KEY is set', async () => {
    process.env['ANTHROPIC_API_KEY'] = REAL_KEY;

    await expect(service.getAvailableProvider()).resolves.toMatchObject({
      provider: 'claude',
      model: 'claude-opus-4-20250514',
      systemPrompt: 'stored prompt',
    });
  });

  it('returns openai when only OPENAI_API_KEY is set', async () => {
    process.env['OPENAI_API_KEY'] = REAL_KEY;

    await expect(service.getAvailableProvider()).resolves.toMatchObject({
      provider: 'openai',
      model: 'gpt-4o',
    });
  });

  it('returns gemini when only GEMINI_API_KEY is set', async () => {
    process.env['GEMINI_API_KEY'] = REAL_KEY;

    await expect(service.getAvailableProvider()).resolves.toMatchObject({
      provider: 'gemini',
      model: 'gemini-flash-latest',
    });
  });

  it('throws when no keys are set', async () => {
    await expect(service.getAvailableProvider()).rejects.toThrow(
      ServiceUnavailableException,
    );
  });

  it('skips providers with a missing, empty, or placeholder key', async () => {
    process.env['ANTHROPIC_API_KEY'] = 'sk-your-key';
    process.env['OPENAI_API_KEY'] = '';
    process.env['GEMINI_API_KEY'] = REAL_KEY;

    await expect(service.getAvailableProvider()).resolves.toMatchObject({
      provider: 'gemini',
      model: 'gemini-flash-latest',
    });
  });

  it('throws a clean error when all keys are placeholders', async () => {
    process.env['ANTHROPIC_API_KEY'] = 'sk-your-key';
    process.env['OPENAI_API_KEY'] = 'changeme';
    process.env['GEMINI_API_KEY'] = 'placeholder-example-key';

    await expect(service.getAvailableProvider()).rejects.toThrow(
      ServiceUnavailableException,
    );
  });

  it('skips claude and uses openai when claude has no credit', async () => {
    process.env['ANTHROPIC_API_KEY'] = REAL_KEY;
    process.env['OPENAI_API_KEY'] = REAL_KEY;

    jest
      .spyOn(
        service as unknown as {
          checkProviderCredit(provider: string): Promise<boolean>;
        },
        'checkProviderCredit',
      )
      .mockImplementation(async (provider) => provider === 'openai');

    await expect(service.getAvailableProvider()).resolves.toMatchObject({
      provider: 'openai',
      model: 'gpt-4o',
    });
  });

  it('returns provider status distinguishing missing, placeholder, and ready keys', async () => {
    process.env['ANTHROPIC_API_KEY'] = 'sk-your-key';
    process.env['OPENAI_API_KEY'] = REAL_KEY;

    await expect(service.getProviderStatus()).resolves.toEqual({
      providers: [
        {
          name: 'claude',
          configured: false,
          status: 'invalid_or_placeholder',
        },
        { name: 'openai', configured: true, status: 'ready' },
        { name: 'gemini', configured: false, status: 'no_key' },
      ],
      activeProvider: 'openai',
    });
  });

  it('returns false for genuine quota errors during credit check', async () => {
    jest.restoreAllMocks();
    jest
      .spyOn(
        service as unknown as { pingProvider(provider: string): Promise<void> },
        'pingProvider',
      )
      .mockRejectedValue(new Error('quota exceeded for this API key'));

    await expect(
      (
        service as unknown as {
          checkProviderCredit(provider: string): Promise<boolean>;
        }
      ).checkProviderCredit('gemini'),
    ).resolves.toBe(false);
  });

  it('returns true for inconclusive credit check errors', async () => {
    jest.restoreAllMocks();
    jest
      .spyOn(
        service as unknown as { pingProvider(provider: string): Promise<void> },
        'pingProvider',
      )
      .mockRejectedValue(new Error('model not found'));

    await expect(
      (
        service as unknown as {
          checkProviderCredit(provider: string): Promise<boolean>;
        }
      ).checkProviderCredit('gemini'),
    ).resolves.toBe(true);
  });

  describe('isValidKey', () => {
    it('rejects undefined', () => {
      expect(service.isValidKey(undefined)).toBe(false);
    });

    it('rejects an empty string', () => {
      expect(service.isValidKey('')).toBe(false);
    });

    it('rejects "sk-your-key"', () => {
      expect(service.isValidKey('sk-your-key')).toBe(false);
    });

    it('rejects strings under 20 characters', () => {
      expect(service.isValidKey('short-key-1234')).toBe(false);
    });

    it('accepts a real-looking key', () => {
      expect(service.isValidKey(REAL_KEY)).toBe(true);
    });
  });

  it('debugAllProviders reports the real provider ping error', async () => {
    process.env['GEMINI_API_KEY'] = 'key';
    jest
      .spyOn(
        service as unknown as { pingProvider(provider: string): Promise<void> },
        'pingProvider',
      )
      .mockRejectedValue(new Error('Gemini model unavailable'));

    await expect(service.debugAllProviders()).resolves.toEqual({
      claude: { hasKey: false, status: 'no key' },
      openai: { hasKey: false, status: 'no key' },
      gemini: {
        hasKey: true,
        status: 'failed',
        error: 'Gemini model unavailable',
      },
    });
  });
});
