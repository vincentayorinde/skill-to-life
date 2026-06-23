import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { ProfileService } from './profile.service';

const mockProfile = {
  id: 'prof1',
  userId: 'user1',
  bio: null,
  location: null,
  website: null,
  linkedinUrl: null,
  githubUrl: null,
  isPublic: false,
  username: null,
  avatarUrl: null,
  currentRole: null,
  experienceLevel: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  savedCareers: [],
  savedResources: [],
  _count: { cvAnalyses: 0 },
};

const mockPrisma = {
  profile: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
};

describe('ProfileService', () => {
  let service: ProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<ProfileService>(ProfileService);
    jest.clearAllMocks();
  });

  describe('findOrCreate', () => {
    it('returns existing profile', async () => {
      mockPrisma.profile.findUnique.mockResolvedValue(mockProfile);
      const result = await service.findOrCreate('user1');
      expect(result).toEqual(mockProfile);
      expect(mockPrisma.profile.create).not.toHaveBeenCalled();
    });

    it('creates profile when not found', async () => {
      mockPrisma.profile.findUnique.mockResolvedValue(null);
      mockPrisma.profile.create.mockResolvedValue(mockProfile);
      const result = await service.findOrCreate('user1');
      expect(result).toEqual(mockProfile);
      expect(mockPrisma.profile.create).toHaveBeenCalledWith({
        data: { userId: 'user1' },
        include: expect.any(Object),
      });
    });
  });

  describe('updateProfile', () => {
    it('throws ConflictException when username taken by another user', async () => {
      mockPrisma.profile.findFirst.mockResolvedValue({ id: 'other' });
      await expect(
        service.updateProfile('user1', { username: 'taken' }),
      ).rejects.toThrow(ConflictException);
    });

    it('updates profile successfully', async () => {
      mockPrisma.profile.findFirst.mockResolvedValue(null);
      mockPrisma.profile.findUnique.mockResolvedValue(mockProfile);
      mockPrisma.profile.update.mockResolvedValue({ ...mockProfile, bio: 'Hello' });
      const result = await service.updateProfile('user1', { bio: 'Hello' });
      expect(result.bio).toBe('Hello');
    });
  });

  describe('toggleVisibility', () => {
    it('sets isPublic to true', async () => {
      mockPrisma.profile.findUnique.mockResolvedValue(mockProfile);
      mockPrisma.profile.update.mockResolvedValue({ ...mockProfile, isPublic: true });
      const result = await service.toggleVisibility('user1', true);
      expect(result.isPublic).toBe(true);
      expect(mockPrisma.profile.update).toHaveBeenCalledWith({
        where: { userId: 'user1' },
        data: { isPublic: true },
      });
    });
  });

  describe('getPublicProfile', () => {
    it('throws NotFoundException for private profile', async () => {
      mockPrisma.profile.findUnique.mockResolvedValue({ ...mockProfile, isPublic: false });
      await expect(service.getPublicProfile('test')).rejects.toThrow(NotFoundException);
    });

    it('throws NotFoundException when profile not found', async () => {
      mockPrisma.profile.findUnique.mockResolvedValue(null);
      await expect(service.getPublicProfile('missing')).rejects.toThrow(NotFoundException);
    });

    it('returns public profile', async () => {
      const pub = { ...mockProfile, isPublic: true, username: 'test', user: { name: 'Alice', avatar: null, email: 'a@b.com' } };
      mockPrisma.profile.findUnique.mockResolvedValue(pub);
      const result = await service.getPublicProfile('test');
      expect(result.isPublic).toBe(true);
    });
  });
});
