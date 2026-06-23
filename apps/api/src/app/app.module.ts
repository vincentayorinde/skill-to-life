import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { ResultsModule } from '../results/results.module';
import { AiConfigModule } from '../ai-config/ai-config.module';
import { ProfileModule } from '../profile/profile.module';
import { SavedCareersModule } from '../saved-careers/saved-careers.module';
import { SavedResourcesModule } from '../saved-resources/saved-resources.module';
import { CvAnalysisModule } from '../cv-analysis/cv-analysis.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        name: 'global',
        ttl: 60000,
        limit: 100,
      },
    ]),
    PrismaModule,
    AuthModule,
    UsersModule,
    ResultsModule,
    AiConfigModule,
    ProfileModule,
    SavedCareersModule,
    SavedResourcesModule,
    CvAnalysisModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
