import { ConflictException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { ProfileService } from '../profile/profile.service';
import { SavedCareersService } from './saved-careers.service';

const mockProfile = { id: 'prof1', userId: 'user1' };

const mockPrisma = {
  savedCareer: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    deleteMany: jest.fn(),
  },
};

const mockProfileService = {
  findOrCreate: jest.fn().mockResolvedValue(mockProfile),
};

describe('SavedCareersService', () => {
  let service: SavedCareersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SavedCareersService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: ProfileService, useValue: mockProfileService },
      ],
    }).compile();

    service = module.get<SavedCareersService>(SavedCareersService);
    jest.clearAllMocks();
    mockProfileService.findOrCreate.mockResolvedValue(mockProfile);
  });

  describe('saveCareer', () => {
    it('returns 409 when career already saved', async () => {
      mockPrisma.savedCareer.findUnique.mockResolvedValue({ id: 'sc1' });
      await expect(
        service.saveCareer('user1', {
          careerId: 'frontend-developer',
          careerTitle: 'Frontend Developer',
          careerEmoji: '🎨',
          careerSlug: 'frontend-developer',
        }),
      ).rejects.toThrow(ConflictException);
    });

    it('creates saved career when not duplicate', async () => {
      mockPrisma.savedCareer.findUnique.mockResolvedValue(null);
      mockPrisma.savedCareer.create.mockResolvedValue({ id: 'sc1', careerId: 'frontend-developer' });
      const result = await service.saveCareer('user1', {
        careerId: 'frontend-developer',
        careerTitle: 'Frontend Developer',
        careerEmoji: '🎨',
        careerSlug: 'frontend-developer',
      });
      expect(result.careerId).toBe('frontend-developer');
    });
  });

  describe('unsaveCareer', () => {
    it('deletes saved career by careerId', async () => {
      mockPrisma.savedCareer.deleteMany.mockResolvedValue({ count: 1 });
      await service.unsaveCareer('user1', 'frontend-developer');
      expect(mockPrisma.savedCareer.deleteMany).toHaveBeenCalledWith({
        where: { profileId: 'prof1', careerId: 'frontend-developer' },
      });
    });
  });

  describe('isCareerSaved', () => {
    it('returns true when saved', async () => {
      mockPrisma.savedCareer.findUnique.mockResolvedValue({ id: 'sc1' });
      expect(await service.isCareerSaved('user1', 'frontend-developer')).toBe(true);
    });

    it('returns false when not saved', async () => {
      mockPrisma.savedCareer.findUnique.mockResolvedValue(null);
      expect(await service.isCareerSaved('user1', 'frontend-developer')).toBe(false);
    });
  });
});
