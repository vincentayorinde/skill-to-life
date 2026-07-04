import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AiConfigService } from './ai-config.service';

@Module({
  imports: [PrismaModule],
  providers: [AiConfigService],
  exports: [AiConfigService],
})
export class AiConfigModule {}
