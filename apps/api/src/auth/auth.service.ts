import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

interface GoogleProfile {
  googleId: string;
  email: string;
  name: string;
  avatar?: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async findOrCreateUser(profile: GoogleProfile): Promise<User> {
    const existing = await this.prisma.user.findUnique({
      where: { googleId: profile.googleId },
    });

    if (existing) {
      await this.ensureProfile(existing.id);
      return existing;
    }

    const user = await this.prisma.user.create({
      data: {
        email: profile.email,
        name: profile.name,
        avatar: profile.avatar,
        googleId: profile.googleId,
      },
    });

    await this.ensureProfile(user.id);
    return user;
  }

  async findOrCreateDevUser(): Promise<User> {
    const user = await this.prisma.user.upsert({
      where: { googleId: 'dev-user-local' },
      update: {},
      create: {
        email: 'dev@skilltolife.local',
        name: 'Dev User',
        avatar: null,
        googleId: 'dev-user-local',
      },
    });

    await this.ensureProfile(user.id);
    return user;
  }

  generateToken(user: User): string {
    return this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });
  }

  async validateUser(payload: { sub: string }): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id: payload.sub } });
  }

  private async ensureProfile(userId: string): Promise<void> {
    const existing = await this.prisma.profile.findUnique({
      where: { userId },
    });
    if (!existing) {
      await this.prisma.profile.create({ data: { userId } });
    }
  }
}
