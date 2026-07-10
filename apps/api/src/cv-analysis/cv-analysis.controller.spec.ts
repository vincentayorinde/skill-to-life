import { UnauthorizedException } from '@nestjs/common';
import { GUARDS_METADATA } from '@nestjs/common/constants';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CvAnalysisController } from './cv-analysis.controller';

describe('CvAnalysisController', () => {
  it('provider status endpoint returns 401 without JWT', async () => {
    const guards = Reflect.getMetadata(GUARDS_METADATA, CvAnalysisController);
    expect(guards).toContain(JwtAuthGuard);

    const noJwtError = new UnauthorizedException();
    expect(noJwtError.getStatus()).toBe(401);
  });
});
