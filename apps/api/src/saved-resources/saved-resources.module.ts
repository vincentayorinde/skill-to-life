import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ProfileModule } from '../profile/profile.module';
import { SavedResourcesController } from './saved-resources.controller';
import { SavedResourcesService } from './saved-resources.service';

@Module({
  imports: [PrismaModule, ProfileModule],
  controllers: [SavedResourcesController],
  providers: [SavedResourcesService],
})
export class SavedResourcesModule {}
