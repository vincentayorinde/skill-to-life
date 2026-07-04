import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { ResultsService } from './results.service';
import { PrismaService } from '../prisma/prisma.service';

const mockResult = {
  id: 'result-1',
  userId: 'user-1',
  answers: {},
  topCareer: 'cybersecurity-analyst',
  topPercentage: 87,
  allMatches: [],
  anonymous: false,
  anonymousToken: null,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockAnonymousResult = {
  ...mockResult,
  id: 'result-anon',
  userId: null,
  anonymous: true,
  anonymousToken: 'anon-token-123',
};

const mockPrisma = {
  result: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
  },
};

describe('ResultsService', () => {
  let service: ResultsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResultsService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<ResultsService>(ResultsService);
    jest.clearAllMocks();
  });

  describe('create', () => {
    const dto = {
      answers: { 1: 'a' },
      topCareer: 'cybersecurity-analyst',
      topPercentage: 87,
      allMatches: [],
    };

    it('saves result with userId when authenticated', async () => {
      mockPrisma.result.create.mockResolvedValue(mockResult);

      await service.create(dto, 'user-1');

      expect(mockPrisma.result.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ userId: 'user-1', anonymous: false }),
        }),
      );
    });

    it('saves anonymous result with token when no userId', async () => {
      mockPrisma.result.create.mockResolvedValue(mockAnonymousResult);

      const result = await service.create(dto);

      expect(mockPrisma.result.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({ anonymous: true }),
        }),
      );
      expect(result.anonymousToken).toBeTruthy();
    });
  });

  describe('claim', () => {
    it('links anonymous result to user', async () => {
      mockPrisma.result.findUnique.mockResolvedValue(mockAnonymousResult);
      mockPrisma.result.update.mockResolvedValue({
        ...mockAnonymousResult,
        userId: 'user-1',
        anonymousToken: null,
      });

      const result = await service.claim(
        'result-anon',
        'anon-token-123',
        'user-1',
      );

      expect(mockPrisma.result.update).toHaveBeenCalledWith({
        where: { id: 'result-anon' },
        data: { userId: 'user-1', anonymous: false, anonymousToken: null },
      });
      expect(result.userId).toBe('user-1');
    });

    it('throws NotFoundException when result not found', async () => {
      mockPrisma.result.findUnique.mockResolvedValue(null);

      await expect(service.claim('bad-id', 'token', 'user-1')).rejects.toThrow(
        NotFoundException,
      );
    });

    it('throws ForbiddenException when token does not match', async () => {
      mockPrisma.result.findUnique.mockResolvedValue(mockAnonymousResult);

      await expect(
        service.claim('result-anon', 'wrong-token', 'user-1'),
      ).rejects.toThrow(ForbiddenException);
    });
  });
});
