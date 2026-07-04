import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { Result } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateResultDto } from './dto/create-result.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class ResultsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    dto: CreateResultDto,
    userId?: string,
  ): Promise<Result & { anonymousToken?: string }> {
    if (userId) {
      return this.prisma.result.create({
        data: {
          userId,
          answers: dto.answers as object,
          topCareer: dto.topCareer,
          topPercentage: dto.topPercentage,
          allMatches: dto.allMatches as object,
          anonymous: false,
        },
      });
    }

    const anonymousToken = dto.anonymousToken ?? randomUUID();
    const result = await this.prisma.result.create({
      data: {
        answers: dto.answers as object,
        topCareer: dto.topCareer,
        topPercentage: dto.topPercentage,
        allMatches: dto.allMatches as object,
        anonymous: true,
        anonymousToken,
      },
    });
    return { ...result, anonymousToken };
  }

  findAllForUser(userId: string): Promise<Result[]> {
    return this.prisma.result.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(
    id: string,
    userId?: string,
    anonymousToken?: string,
  ): Promise<Result> {
    const result = await this.prisma.result.findUnique({ where: { id } });
    if (!result) throw new NotFoundException('Result not found');

    const isOwner = userId && result.userId === userId;
    const isAnonymousOwner =
      anonymousToken && result.anonymousToken === anonymousToken;
    if (!isOwner && !isAnonymousOwner) {
      throw new ForbiddenException('Access denied');
    }

    return result;
  }

  async claim(
    id: string,
    anonymousToken: string,
    userId: string,
  ): Promise<Result> {
    const result = await this.prisma.result.findUnique({ where: { id } });
    if (!result) throw new NotFoundException('Result not found');
    if (result.anonymousToken !== anonymousToken) {
      throw new ForbiddenException('Invalid token');
    }

    return this.prisma.result.update({
      where: { id },
      data: { userId, anonymous: false, anonymousToken: null },
    });
  }
}
