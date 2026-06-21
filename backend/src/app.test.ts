import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from './app';

describe('App Global Setup', () => {
  it('should respond OK on Health Check', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'OK' });
  });

  it('should have security headers (Helmet)', async () => {
    const res = await request(app).get('/health');
    expect(res.headers['x-powered-by']).toBeUndefined();
    expect(res.headers).toHaveProperty('x-dns-prefetch-control');
  });

  it('should have CORS enabled', async () => {
    const res = await request(app)
      .options('/health')
      .set('Origin', 'http://localhost');
    expect(res.headers).toHaveProperty('access-control-allow-origin');
  });

  it('should handle undefined routes with 404', async () => {
    const res = await request(app).get('/not-found');
    expect(res.status).toBe(404);
  });
});
