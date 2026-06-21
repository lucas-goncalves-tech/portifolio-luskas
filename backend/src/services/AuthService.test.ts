import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthService } from './AuthService';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

vi.mock('argon2');
vi.mock('jsonwebtoken');

describe('AuthService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return a token if password is valid', async () => {
    vi.mocked(argon2.verify).mockResolvedValue(true);
    vi.mocked(jwt.sign).mockReturnValue('valid-token' as any);

    const token = await AuthService.login('correct-password', 'hashed-password');

    expect(argon2.verify).toHaveBeenCalledWith('hashed-password', 'correct-password');
    expect(jwt.sign).toHaveBeenCalled();
    expect(token).toBe('valid-token');
  });

  it('should throw an error if password is invalid', async () => {
    vi.mocked(argon2.verify).mockResolvedValue(false);

    await expect(AuthService.login('wrong-password', 'hashed-password')).rejects.toThrow('Invalid credentials');
  });
});
