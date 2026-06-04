import { Test } from '@nestjs/testing';
import { AppService } from './app.service';
import { PrismaService } from '../prisma/prisma.service';

const mockPrisma = {
  $queryRaw: jest.fn().mockResolvedValue([{ '?column?': 1 }]),
};

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AppService, { provide: PrismaService, useValue: mockPrisma }],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      expect(service.getData()).toEqual({ message: 'Hello API' });
    });
  });

  describe('getHealth', () => {
    it('returns ok status when database is reachable', async () => {
      mockPrisma.$queryRaw.mockResolvedValueOnce([{ '?column?': 1 }]);
      const result = await service.getHealth();
      expect(result.status).toBe('ok');
      expect(result.service).toBe('nextskill-api');
      expect(result.version).toBe('1.0.0');
      expect(result.database).toBe('connected');
      expect(result.timestamp).toBeTruthy();
    });

    it('returns degraded status when database is unreachable', async () => {
      mockPrisma.$queryRaw.mockRejectedValueOnce(new Error('DB down'));
      const result = await service.getHealth();
      expect(result.status).toBe('degraded');
      expect(result.database).toBe('unavailable');
    });
  });
});
