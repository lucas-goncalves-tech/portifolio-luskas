import 'reflect-metadata';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '../../../src/app';
import { prismaTestClient } from '../../vitest.setup';
import { clearDatabase } from '../../test.utils';
import argon2 from 'argon2';
import { env } from '../../../src/core/config/env';

describe('Reports Integration Tests', () => {
  let adminCookie: string;

  beforeAll(async () => {
    await clearDatabase();
    
    // Seed an admin user for testing
    const hash = await argon2.hash('password123' + env.PEPPER);
    await prismaTestClient.user.create({
      data: {
        email: 'reportadmin@test.com',
        name: 'Report Admin',
        password: hash,
      },
    });

    // Login to get access token/cookie
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ email: 'reportadmin@test.com', password: 'password123' });
    
    // AuthMiddleware currently checks Authorization header with Bearer token
    // Actually, our latest authMiddleware checks req.cookies.access_token OR Bearer token.
    // Let's use the Bearer token for integration tests of reports.
    adminCookie = loginRes.body.accessToken;
  });

  afterAll(async () => {
    await clearDatabase();
  });

  describe('GET /api/reports', () => {
    it('should return 200 and list of reports without auth', async () => {
      const response = await request(app).get('/api/reports');
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });

  describe('POST /api/reports', () => {
    it('should return 401 if not authenticated', async () => {
      const response = await request(app)
        .post('/api/auth/login') // Wait, the endpoint is /api/reports
      // Fix:
      const res = await request(app).post('/api/reports').send({
        id: 'new-report-1',
        content: 'Testing reports'
      });
      expect(res.status).toBe(401);
    });

    it('should return 201 if authenticated', async () => {
      const response = await request(app)
        .post('/api/reports')
        .set('Authorization', `Bearer ${adminCookie}`)
        .send({
          id: 'new-report-1',
          content: '# Testing reports\nThis is a test report.'
        });

      expect(response.status).toBe(201);
      expect(response.body.id).toBe('new-report-1');
    });
  });
});
