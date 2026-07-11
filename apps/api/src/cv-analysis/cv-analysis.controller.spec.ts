import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { GUARDS_METADATA } from '@nestjs/common/constants';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CvAnalysisController } from './cv-analysis.controller';

describe('CvAnalysisController', () => {
  const originalEnv = process.env;

  afterEach(() => {
    process.env = originalEnv;
  });

  it('provider status endpoint returns 401 without JWT', async () => {
    const guards = Reflect.getMetadata(GUARDS_METADATA, CvAnalysisController);
    expect(guards).toContain(JwtAuthGuard);

    const noJwtError = new UnauthorizedException();
    expect(noJwtError.getStatus()).toBe(401);
  });

  it('hides debug provider endpoint outside development', async () => {
    process.env = { ...originalEnv, NODE_ENV: 'production' };
    const controller = new CvAnalysisController({} as never, {
      debugAllProviders: jest.fn(),
    } as never);

    await expect(controller.debugProviders()).rejects.toThrow(
      NotFoundException,
    );
  });

  it('returns provider debug results in development', async () => {
    process.env = { ...originalEnv, NODE_ENV: 'development' };
    const debugAllProviders = jest.fn().mockResolvedValue({
      gemini: { hasKey: true, status: 'working' },
    });
    const controller = new CvAnalysisController({} as never, {
      debugAllProviders,
    } as never);

    await expect(controller.debugProviders()).resolves.toEqual({
      gemini: { hasKey: true, status: 'working' },
    });
  });
});
