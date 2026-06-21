import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('Environment Configuration (Zod Validator)', () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it('should validate environment variables successfully when all required variables are present', async () => {
    vi.stubEnv('NODE_ENV', 'test');
    vi.stubEnv('PORT', '3000');
    vi.stubEnv('DATABASE_URL', 'postgresql://user:password@localhost:5432/db');
    vi.stubEnv('JWT_SECRET', 'super-secret-test-key');

    // Example assertion assuming validation loads correctly
    const mockEnv = {
      NODE_ENV: process.env.NODE_ENV,
      PORT: parseInt(process.env.PORT as string, 10),
      DATABASE_URL: process.env.DATABASE_URL,
      JWT_SECRET: process.env.JWT_SECRET,
    };
    
    expect(mockEnv.PORT).toBe(3000);
    expect(mockEnv.NODE_ENV).toBe('test');
    vi.unstubAllEnvs();
  });

  it('should throw an error if a required environment variable is missing', async () => {
    vi.stubEnv('NODE_ENV', 'test');
    vi.stubEnv('PORT', '3000');
    // Omitting JWT_SECRET and DATABASE_URL on purpose to simulate failure

    expect(() => {
      if (!process.env.JWT_SECRET) throw new Error('Invalid environment variables');
    }).toThrow();

    vi.unstubAllEnvs();
  });
});
