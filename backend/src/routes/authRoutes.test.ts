import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import { authRouter } from './authRoutes';
import { PrismaClient } from '@prisma/client';
import { AuthService } from '../services/AuthService';

vi.mock('@prisma/client', () => {
  const mPrismaClient = {
    user: {
      findUnique: vi.fn(),
    },
  };
  return { PrismaClient: vi.fn(() => mPrismaClient) };
});

vi.mock('../services/AuthService');

describe('Auth Routes', () => {
  let app: express.Express;
  let prisma: any;

  beforeEach(() => {
    vi.clearAllMocks();
    app = express();
    app.use(express.json());
    app.use('/api/auth', authRouter);
    prisma = new PrismaClient();
  });

  it('POST /api/auth/login should return 400 for invalid body', async () => {
    const res = await request(app).post('/api/auth/login').send({ email: 'not-an-email' });
    expect(res.status).toBe(400);
  });

  it('POST /api/auth/login should return 401 for invalid credentials', async () => {
    prisma.user.findUnique.mockResolvedValue(null);
    const res = await request(app).post('/api/auth/login').send({ email: 'admin@admin.com', password: 'wrong' });
    expect(res.status).toBe(401);
  });

  it('POST /api/auth/login should return 200 and token on success', async () => {
    prisma.user.findUnique.mockResolvedValue({ id: 1, email: 'admin@admin.com', password: 'hashed' });
    vi.mocked(AuthService.login).mockResolvedValue('valid-token');

    const res = await request(app).post('/api/auth/login').send({ email: 'admin@admin.com', password: 'correct' });
    
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token', 'valid-token');
  });
});
