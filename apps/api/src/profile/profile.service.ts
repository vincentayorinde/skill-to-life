import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Profile } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async findOrCreate(userId: string): Promise<Profile> {
    const existing = await this.prisma.profile.findUnique({
      where: { userId },
      include: {
        savedCareers: { orderBy: { savedAt: 'desc' } },
        savedResources: { orderBy: { savedAt: 'desc' } },
        _count: { select: { cvAnalyses: true } },
      },
    });
    if (existing) return existing;

    return this.prisma.profile.create({
      data: { userId },
      include: {
        savedCareers: true,
        savedResources: true,
        _count: { select: { cvAnalyses: true } },
      },
    });
  }

  async updateProfile(userId: string, dto: UpdateProfileDto): Promise<Profile> {
    if (dto.username) {
      const conflict = await this.prisma.profile.findFirst({
        where: { username: dto.username, NOT: { userId } },
      });
      if (conflict) throw new ConflictException('Username already taken');
    }

    await this.findOrCreate(userId);
    return this.prisma.profile.update({
      where: { userId },
      data: dto,
    });
  }

  async toggleVisibility(userId: string, isPublic: boolean): Promise<Profile> {
    await this.findOrCreate(userId);
    return this.prisma.profile.update({
      where: { userId },
      data: { isPublic },
    });
  }

  async getPublicProfile(username: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { username },
      include: {
        user: { select: { name: true, avatar: true, email: true } },
        savedCareers: { orderBy: { savedAt: 'desc' } },
        _count: { select: { cvAnalyses: true, savedResources: true } },
      },
    });

    if (!profile || !profile.isPublic) {
      throw new NotFoundException('Profile not found');
    }

    return profile;
  }

  async checkUsernameAvailable(
    username: string,
    userId?: string,
  ): Promise<boolean> {
    const existing = await this.prisma.profile.findFirst({
      where: {
        username,
        ...(userId ? { NOT: { userId } } : {}),
      },
    });
    return !existing;
  }
}
