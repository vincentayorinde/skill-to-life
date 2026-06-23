import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ProfileModule } from '../profile/profile.module';
import { SavedCareersController } from './saved-careers.controller';
import { SavedCareersService } from './saved-careers.service';

@Module({
  imports: [PrismaModule, ProfileModule],
  controllers: [SavedCareersController],
  providers: [SavedCareersService],
})
export class SavedCareersModule {}
