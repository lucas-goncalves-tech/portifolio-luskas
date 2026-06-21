import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express, { Request, Response } from 'express';
import { authMiddleware } from './authMiddleware';
import jwt from 'jsonwebtoken';

vi.mock('jsonwebtoken');

describe('Auth Middleware', () => {
  let app: express.Express;

  beforeEach(() => {
    vi.clearAllMocks();
    app = express();
    app.use('/protected', authMiddleware, (req: Request, res: Response) => {
      res.status(200).send('success');
    });
  });

  it('should return 401 if no token provided', async () => {
    const res = await request(app).get('/protected');
    expect(res.status).toBe(401);
  });

  it('should return 401 if token is invalid', async () => {
    vi.mocked(jwt.verify).mockImplementation(() => {
      throw new Error('Invalid');
    });
    const res = await request(app).get('/protected').set('Authorization', 'Bearer invalid-token');
    expect(res.status).toBe(401);
  });

  it('should return 200 and set user if token is valid', async () => {
    vi.mocked(jwt.verify).mockReturnValue({ role: 'admin' } as any);
    const res = await request(app).get('/protected').set('Authorization', 'Bearer valid-token');
    expect(res.status).toBe(200);
  });
});
