import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProfileService } from '../profile/profile.service';
import { SaveCareerDto } from './dto/save-career.dto';

@Injectable()
export class SavedCareersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly profileService: ProfileService,
  ) {}

  async getSavedCareers(userId: string) {
    const profile = await this.profileService.findOrCreate(userId);
    return this.prisma.savedCareer.findMany({
      where: { profileId: profile.id },
      orderBy: { savedAt: 'desc' },
    });
  }

  async saveCareer(userId: string, dto: SaveCareerDto) {
    const profile = await this.profileService.findOrCreate(userId);

    const existing = await this.prisma.savedCareer.findUnique({
      where: { profileId_careerId: { profileId: profile.id, careerId: dto.careerId } },
    });
    if (existing) throw new ConflictException('Career already saved');

    return this.prisma.savedCareer.create({
      data: { profileId: profile.id, ...dto },
    });
  }

  async unsaveCareer(userId: string, careerId: string): Promise<void> {
    const profile = await this.profileService.findOrCreate(userId);
    await this.prisma.savedCareer.deleteMany({
      where: { profileId: profile.id, careerId },
    });
  }

  async isCareerSaved(userId: string, careerId: string): Promise<boolean> {
    const profile = await this.profileService.findOrCreate(userId);
    const saved = await this.prisma.savedCareer.findUnique({
      where: { profileId_careerId: { profileId: profile.id, careerId } },
    });
    return !!saved;
  }
}
