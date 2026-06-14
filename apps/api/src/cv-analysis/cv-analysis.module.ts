import { Module } from '@nestjs/common';
import { AiConfigModule } from '../ai-config/ai-config.module';
import { PrismaModule } from '../prisma/prisma.module';
import { ProfileModule } from '../profile/profile.module';
import { CvAnalysisController } from './cv-analysis.controller';
import { CvAnalysisProcessor } from './cv-analysis.processor';
import { CvAnalysisService } from './cv-analysis.service';

@Module({
  imports: [PrismaModule, ProfileModule, AiConfigModule],
  controllers: [CvAnalysisController],
  providers: [CvAnalysisService, CvAnalysisProcessor],
})
export class CvAnalysisModule {}
