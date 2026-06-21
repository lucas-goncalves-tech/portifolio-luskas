import request from 'supertest';
import { describe, it, expect } from 'vitest';
import { app } from './app';

describe('Docs Routes', () => {
  it('should render the Scalar API reference at /docs', async () => {
    const response = await request(app).get('/docs');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/text\/html/);
    expect(response.text).toContain('Scalar');
  });
});
