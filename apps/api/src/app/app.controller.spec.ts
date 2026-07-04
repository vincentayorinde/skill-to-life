import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from '../prisma/prisma.service';

const mockPrisma = {
  $queryRaw: jest.fn().mockResolvedValue([{ '?column?': 1 }]),
};

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, { provide: PrismaService, useValue: mockPrisma }],
    }).compile();
  });

  describe('getData', () => {
    it('should return "Hello API"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.getData()).toEqual({ message: 'Hello API' });
    });
  });

  describe('getHealth', () => {
    it('should return API health status with version and timestamp', async () => {
      const appController = app.get<AppController>(AppController);
      const result = await appController.getHealth();
      expect(result.status).toBe('ok');
      expect(result.service).toBe('skill-to-life-api');
      expect(result.version).toBe('1.0.0');
      expect(result.database).toBe('connected');
      expect(result.timestamp).toBeTruthy();
    });
  });
});
