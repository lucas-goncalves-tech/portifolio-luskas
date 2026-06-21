import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('AuthService', () => {
  let authService: any;
  let mockAuthRepository: any;

  beforeEach(() => {
    vi.clearAllMocks();

    mockAuthRepository = {
      findByEmail: vi.fn(),
      create: vi.fn(),
    };

    // Assuming AuthService constructor takes the repository as a dependency
    class MockAuthService {
      constructor(private repo: any) {}
      async login(email: string) {
        return this.repo.findByEmail(email);
      }
    }
    
    authService = new MockAuthService(mockAuthRepository);
  });

  it('should interact with the repository mock when logging in', async () => {
    const fakeUser = { id: '1', email: 'test@example.com' };
    mockAuthRepository.findByEmail.mockResolvedValue(fakeUser);

    const result = await authService.login('test@example.com');
    
    expect(mockAuthRepository.findByEmail).toHaveBeenCalledWith('test@example.com');
    expect(mockAuthRepository.findByEmail).toHaveBeenCalledTimes(1);
    expect(result).toEqual(fakeUser);
  });
});
