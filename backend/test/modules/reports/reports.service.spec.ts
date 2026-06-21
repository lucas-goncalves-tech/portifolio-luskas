import 'reflect-metadata';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ReportsService } from '../../../src/modules/reports/reports.service';
import fs from 'fs/promises';

vi.mock('fs/promises');

describe('ReportsService (Unit)', () => {
  let reportsService: ReportsService;

  beforeEach(() => {
    reportsService = new ReportsService();
    vi.clearAllMocks();
  });

  describe('createReport', () => {
    it('should create a markdown file', async () => {
      (fs.writeFile as any).mockResolvedValue(undefined);
      (fs.mkdir as any).mockResolvedValue(undefined);

      const result = await reportsService.createReport('vuln-123', {
        title: 'SQLi',
        vulnerability: 'High',
        content: '# Description',
      });

      expect(fs.writeFile).toHaveBeenCalled();
      expect(result.id).toBe('vuln-123');
      expect(result.content).toBe('# Description');
    });
  });

  describe('deleteReport', () => {
    it('should delete a markdown file', async () => {
      (fs.access as any).mockResolvedValue(undefined);
      (fs.unlink as any).mockResolvedValue(undefined);

      await reportsService.deleteReport('vuln-123');

      expect(fs.access).toHaveBeenCalled();
      expect(fs.unlink).toHaveBeenCalled();
    });
  });
});
