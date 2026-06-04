import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async getHealth(): Promise<{
    status: string;
    service: string;
    version: string;
    database: string;
    timestamp: string;
  }> {
    let database = 'connected';
    try {
      await this.prisma.$queryRaw`SELECT 1`;
    } catch {
      database = 'unavailable';
    }

    return {
      status: database === 'connected' ? 'ok' : 'degraded',
      service: 'nextskill-api',
      version: '1.0.0',
      database,
      timestamp: new Date().toISOString(),
    };
  }

  getData(): { message: string } {
    return { message: 'Hello API' };
  }
}
