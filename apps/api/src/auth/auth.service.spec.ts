import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';

const mockUser = {
  id: 'user-1',
  email: 'test@example.com',
  name: 'Test User',
  avatar: null,
  googleId: 'google-123',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const mockPrisma = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
  profile: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
};

const mockJwt = {
  sign: jest.fn().mockReturnValue('mock-jwt-token'),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrisma },
        { provide: JwtService, useValue: mockJwt },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  describe('findOrCreateUser', () => {
    it('returns existing user when found by googleId', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(mockUser);
      mockPrisma.profile.findUnique.mockResolvedValue({ id: 'profile-1' });

      const result = await service.findOrCreateUser({
        googleId: 'google-123',
        email: 'test@example.com',
        name: 'Test User',
      });

      expect(result).toEqual(mockUser);
      expect(mockPrisma.profile.findUnique).toHaveBeenCalledWith({
        where: { userId: mockUser.id },
      });
      expect(mockPrisma.user.create).not.toHaveBeenCalled();
    });

    it('creates and returns new user when not found', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);
      mockPrisma.user.create.mockResolvedValue(mockUser);
      mockPrisma.profile.findUnique.mockResolvedValue(null);
      mockPrisma.profile.create.mockResolvedValue({ id: 'profile-1' });

      const result = await service.findOrCreateUser({
        googleId: 'google-123',
        email: 'test@example.com',
        name: 'Test User',
      });

      expect(result).toEqual(mockUser);
      expect(mockPrisma.user.create).toHaveBeenCalledWith({
        data: {
          email: 'test@example.com',
          name: 'Test User',
          avatar: undefined,
          googleId: 'google-123',
        },
      });
      expect(mockPrisma.profile.create).toHaveBeenCalledWith({
        data: { userId: mockUser.id },
      });
    });
  });

  describe('generateToken', () => {
    it('calls jwtService.sign with sub and email', () => {
      const token = service.generateToken(mockUser);

      expect(mockJwt.sign).toHaveBeenCalledWith({
        sub: mockUser.id,
        email: mockUser.email,
      });
      expect(token).toBe('mock-jwt-token');
    });
  });
});
