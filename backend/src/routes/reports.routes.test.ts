import { describe, it, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express, { Request, Response, NextFunction } from 'express';
import reportsRouter from './reports.routes';
const { mockListReports, mockGetReport, mockCreateReport, mockUpdateReport, mockDeleteReport } = vi.hoisted(() => ({
  mockListReports: vi.fn(),
  mockGetReport: vi.fn(),
  mockCreateReport: vi.fn(),
  mockUpdateReport: vi.fn(),
  mockDeleteReport: vi.fn()
}));

vi.mock('../services/reports.service', () => {
  return {
    ReportsService: vi.fn().mockImplementation(() => {
      return {
        listReports: mockListReports,
        getReport: mockGetReport,
        createReport: mockCreateReport,
        updateReport: mockUpdateReport,
        deleteReport: mockDeleteReport
      };
    })
  };
});

vi.mock('../middlewares/authMiddleware', () => ({
  authMiddleware: (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.authorization === 'Bearer valid_token') {
      next();
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  }
}));

const app = express();
app.use(express.json());
app.use('/api/reports', reportsRouter);

describe('Reports Routes', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe('GET /api/reports', () => {
    it('should return a list of reports', async () => {
      mockListReports.mockResolvedValue([
        { id: '1', title: 'Test 1', content: 'C1' }
      ]);
      const res = await request(app).get('/api/reports');
      expect(res.status).toBe(200);
      expect(res.body).toEqual([{ id: '1', title: 'Test 1', content: 'C1' }]);
    });
  });

  describe('GET /api/reports/:id', () => {
    it('should return a report', async () => {
      mockGetReport.mockResolvedValue({ id: '1', title: 'Test 1', content: 'C1' });
      const res = await request(app).get('/api/reports/1');
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ id: '1', title: 'Test 1', content: 'C1' });
    });
  });

  describe('POST /api/reports', () => {
    it('should require auth', async () => {
      const res = await request(app).post('/api/reports').send({});
      expect(res.status).toBe(401);
    });

    it('should create a report if authenticated', async () => {
      mockCreateReport.mockResolvedValue({ id: 'new', content: 'C' });
      const res = await request(app)
        .post('/api/reports')
        .set('Authorization', 'Bearer valid_token')
        .send({ id: 'new', content: 'C' });
      
      expect(res.status).toBe(201);
    });
  });

  describe('PUT /api/reports/:id', () => {
    it('should require auth', async () => {
      const res = await request(app).put('/api/reports/1').send({});
      expect(res.status).toBe(401);
    });

    it('should update a report if authenticated', async () => {
      mockUpdateReport.mockResolvedValue({ id: '1', content: 'C2' });
      const res = await request(app)
        .put('/api/reports/1')
        .set('Authorization', 'Bearer valid_token')
        .send({ content: 'C2' });
      
      expect(res.status).toBe(200);
    });
  });

  describe('DELETE /api/reports/:id', () => {
    it('should require auth', async () => {
      const res = await request(app).delete('/api/reports/1');
      expect(res.status).toBe(401);
    });

    it('should delete a report if authenticated', async () => {
      mockDeleteReport.mockResolvedValue(undefined);
      const res = await request(app)
        .delete('/api/reports/1')
        .set('Authorization', 'Bearer valid_token');
      
      expect(res.status).toBe(204);
    });
  });
});
