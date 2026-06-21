import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ReportsService } from './reports.service';
import fs from 'fs/promises';

vi.mock('fs/promises');

describe('ReportsService', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should list all reports', async () => {
    vi.mocked(fs.readdir).mockResolvedValue(['test1.md', 'test2.md'] as any);
    vi.mocked(fs.readFile).mockImplementation(async (path) => {
      if (path.toString().includes('test1.md')) {
        return '---\ntitle: Test 1\n---\nContent 1';
      }
      return '---\ntitle: Test 2\n---\nContent 2';
    });

    const service = new ReportsService();
    const reports = await service.listReports();

    expect(reports).toHaveLength(2);
    expect((reports[0] as any).title).toBe('Test 1');
    expect(reports[0].content).toBe('Content 1');
  });

  it('should get a single report by id', async () => {
    vi.mocked(fs.readFile).mockResolvedValue('---\ntitle: Test 1\n---\nContent 1');
    const service = new ReportsService();
    const report = await service.getReport('test1');
    
    expect((report as any).title).toBe('Test 1');
    expect(report.content).toBe('Content 1');
    expect(report.id).toBe('test1');
  });

  it('should create a new report', async () => {
    vi.mocked(fs.writeFile).mockResolvedValue();
    vi.mocked(fs.mkdir).mockResolvedValue(undefined);

    const service = new ReportsService();
    const report = await service.createReport('test-new', {
      title: 'New Title',
      vulnerability: 'SQLi',
      content: 'New content'
    });

    expect(report.id).toBe('test-new');
    expect(fs.writeFile).toHaveBeenCalled();
  });

  it('should update a report', async () => {
    vi.mocked(fs.access).mockResolvedValue();
    vi.mocked(fs.writeFile).mockResolvedValue();

    const service = new ReportsService();
    const report = await service.updateReport('test-update', {
      title: 'Updated',
      content: 'Updated content'
    });

    expect(report.id).toBe('test-update');
    expect(fs.writeFile).toHaveBeenCalled();
  });

  it('should delete a report', async () => {
    vi.mocked(fs.access).mockResolvedValue();
    vi.mocked(fs.unlink).mockResolvedValue();

    const service = new ReportsService();
    await service.deleteReport('test-delete');

    expect(fs.unlink).toHaveBeenCalled();
  });
});
