import { Request, Response } from 'express';
import { z } from 'zod';
import { injectable, inject } from 'tsyringe';
import { ReportsService } from './reports.service';

const createReportSchema = z.object({
  id: z.string().min(1),
  title: z.string().optional(),
  vulnerability: z.string().optional(),
  content: z.string()
});

const updateReportSchema = z.object({
  title: z.string().optional(),
  vulnerability: z.string().optional(),
  content: z.string().optional()
});

@injectable()
export class ReportsController {
  constructor(@inject(ReportsService) private service: ReportsService) {}
  async list(req: Request, res: Response) {
    try {
      const reports = await this.service.listReports();
      res.json(reports);
    } catch (e) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async get(req: Request, res: Response) {
    try {
      const report = await this.service.getReport(req.params.id);
      res.json(report);
    } catch (e) {
      res.status(404).json({ error: 'Report not found' });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const parsed = createReportSchema.parse(req.body);
      const report = await this.service.createReport(parsed.id, parsed);
      res.status(201).json(report);
    } catch (e) {
      if (e instanceof z.ZodError) {
        res.status(400).json({ error: e.errors });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  async update(req: Request, res: Response) {
    try {
      const parsed = updateReportSchema.parse(req.body);
      const report = await this.service.updateReport(req.params.id, parsed);
      res.json(report);
    } catch (e: any) {
      if (e instanceof z.ZodError) {
        res.status(400).json({ error: e.errors });
      } else if (e.code === 'ENOENT') {
        res.status(404).json({ error: 'Report not found' });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await this.service.deleteReport(req.params.id);
      res.status(204).send();
    } catch (e: any) {
      if (e.code === 'ENOENT') {
        res.status(404).json({ error: 'Report not found' });
      } else {
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  }
}
