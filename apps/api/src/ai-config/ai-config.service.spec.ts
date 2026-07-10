import { ServiceUnavailableException } from '@nestjs/common';
import { AiConfigService } from './ai-config.service';
import { PrismaService } from '../prisma/prisma.service';

const ORIGINAL_ENV = process.env;

describe('AiConfigService', () => {
  let service: AiConfigService;
  let prisma: { aiConfig: { findFirst: jest.Mock; create: jest.Mock } };

  beforeEach(() => {
    process.env = { ...ORIGINAL_ENV };
    delete process.env['ANTHROPIC_API_KEY'];
    delete process.env['OPENAI_API_KEY'];
    delete process.env['GEMINI_API_KEY'];

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
    process.env['ANTHROPIC_API_KEY'] = 'key';

    await expect(service.getAvailableProvider()).resolves.toMatchObject({
      provider: 'claude',
      model: 'claude-opus-4-20250514',
      systemPrompt: 'stored prompt',
    });
  });

  it('returns openai when only OPENAI_API_KEY is set', async () => {
    process.env['OPENAI_API_KEY'] = 'key';

    await expect(service.getAvailableProvider()).resolves.toMatchObject({
      provider: 'openai',
      model: 'gpt-4o',
    });
  });

  it('returns gemini when only GEMINI_API_KEY is set', async () => {
    process.env['GEMINI_API_KEY'] = 'key';

    await expect(service.getAvailableProvider()).resolves.toMatchObject({
      provider: 'gemini',
      model: 'gemini-1.5-pro',
    });
  });

  it('throws when no keys are set', async () => {
    await expect(service.getAvailableProvider()).rejects.toThrow(
      ServiceUnavailableException,
    );
  });

  it('skips claude and uses openai when claude has no credit', async () => {
    process.env['ANTHROPIC_API_KEY'] = 'key';
    process.env['OPENAI_API_KEY'] = 'key';

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

  it('returns provider status with correct hasKey values', async () => {
    process.env['OPENAI_API_KEY'] = 'key';

    await expect(service.getProviderStatus()).resolves.toEqual({
      providers: [
        { name: 'claude', hasKey: false, status: 'no_key' },
        { name: 'openai', hasKey: true, status: 'unknown' },
        { name: 'gemini', hasKey: false, status: 'no_key' },
      ],
      activeProvider: 'openai',
    });
  });
});
