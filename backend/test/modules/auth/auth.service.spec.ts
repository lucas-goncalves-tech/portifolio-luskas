import 'reflect-metadata';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthService } from '../../../src/modules/auth/auth.service';
import { UserRepository } from '../../../src/modules/users/UserRepository';
import { AuthRepository } from '../../../src/modules/auth/auth.repository';
import { JwtService } from '../../../src/modules/auth/security/JwtService';
import argon2 from 'argon2';
import { UnauthorizedException } from '../../../src/core/exceptions/UnauthorizedException';

vi.mock('argon2');

describe('AuthService (Unit)', () => {
  let authService: AuthService;
  let mockUserRepo: jest.Mocked<UserRepository>;
  let mockAuthRepo: jest.Mocked<AuthRepository>;
  let mockJwtService: jest.Mocked<JwtService>;

  beforeEach(() => {
    mockUserRepo = { findByEmail: vi.fn(), findById: vi.fn() } as any;
    mockAuthRepo = { createRefreshToken: vi.fn(), findRefreshTokenById: vi.fn(), deleteRefreshTokenByUserId: vi.fn() } as any;
    mockJwtService = { generateAccessToken: vi.fn(), getRefreshTokenExpiration: vi.fn() } as any;

    authService = new AuthService(mockUserRepo, mockAuthRepo, mockJwtService);
  });

  describe('login', () => {
    it('should throw UnauthorizedException if user not found', async () => {
      mockUserRepo.findByEmail.mockResolvedValue(null);

      await expect(authService.login('test@test.com', 'pass')).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if password does not match', async () => {
      mockUserRepo.findByEmail.mockResolvedValue({ id: 1, email: 'test@test.com', password: 'hash', name: 'Test' });
      (argon2.verify as any).mockResolvedValue(false);

      await expect(authService.login('test@test.com', 'pass')).rejects.toThrow(UnauthorizedException);
    });

    it('should return tokens on success', async () => {
      mockUserRepo.findByEmail.mockResolvedValue({ id: 1, email: 'test@test.com', passwordHash: 'hash', name: 'Test' } as any);
      (argon2.verify as any).mockResolvedValue(true);
      mockJwtService.generateAccessToken.mockReturnValue('access_token');
      mockJwtService.getRefreshTokenExpiration.mockReturnValue(new Date());
      mockAuthRepo.createRefreshToken.mockResolvedValue({ id: 'uuid-123', userId: 1, expiresAt: new Date() } as any);

      const result = await authService.login({ email: 'test@test.com', password: 'pass' });

      expect(result.response.accessToken).toBe('access_token');
      expect(result.refreshToken).toBe('uuid-123');
      expect(mockAuthRepo.deleteRefreshTokenByUserId).toHaveBeenCalledWith(1);
    });
  });
});
