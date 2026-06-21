import 'reflect-metadata';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '../../../src/app';
import { prismaTestClient } from '../../vitest.setup';
import { clearDatabase } from '../../test.utils';
import argon2 from 'argon2';
import { env } from '../../../src/core/config/env';

describe('Auth Integration Tests', () => {
  beforeAll(async () => {
    await clearDatabase();
    
    // Seed an admin user for testing
    const hash = await argon2.hash('password123' + env.PEPPER);
    await prismaTestClient.user.create({
      data: {
        email: 'admin@test.com',
        name: 'Admin Test',
        password: hash,
      },
    });
  });

  afterAll(async () => {
    await clearDatabase();
  });

  describe('POST /api/auth/login', () => {
    it('should return 200 and cookies for valid credentials', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'admin@test.com',
          password: 'password123',
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('accessToken');
      expect(response.body.user).toHaveProperty('email', 'admin@test.com');
      
      // Check for set-cookie header
      const cookies = response.headers['set-cookie'];
      expect(cookies).toBeDefined();
      expect(cookies.some((c: string) => c.startsWith('refreshToken='))).toBe(true);
    });



    it('should return 400 for missing fields (Zod Validation)', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'admin@test.com',
        });

      expect(response.status).toBe(400);
      expect(response.body.errors).toBeInstanceOf(Array);
    });
  });
});
