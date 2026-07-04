import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProfileService } from '../profile/profile.service';
import { SaveResourceDto } from './dto/save-resource.dto';

@Injectable()
export class SavedResourcesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly profileService: ProfileService,
  ) {}

  async getSavedResources(userId: string) {
    const profile = await this.profileService.findOrCreate(userId);
    const resources = await this.prisma.savedResource.findMany({
      where: { profileId: profile.id },
      orderBy: { savedAt: 'desc' },
    });

    // Group by career
    const grouped: Record<string, typeof resources> = {};
    for (const r of resources) {
      const key = r.careerTitle ?? 'Other';
      grouped[key] ??= [];
      grouped[key].push(r);
    }
    return grouped;
  }

  async saveResource(userId: string, dto: SaveResourceDto) {
    const profile = await this.profileService.findOrCreate(userId);
    return this.prisma.savedResource.upsert({
      where: {
        profileId_resourceUrl: {
          profileId: profile.id,
          resourceUrl: dto.resourceUrl,
        },
      },
      update: dto,
      create: { profileId: profile.id, ...dto },
    });
  }

  async unsaveResource(userId: string, resourceUrl: string): Promise<void> {
    const profile = await this.profileService.findOrCreate(userId);
    await this.prisma.savedResource.deleteMany({
      where: { profileId: profile.id, resourceUrl },
    });
  }
}
