import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';

const REPORTS_DIR = path.join(process.cwd(), 'reports');

export interface ReportData {
  title?: string;
  vulnerability?: string;
  content: string;
  [key: string]: any;
}

export class ReportsService {
  private async ensureDir() {
    try {
      await fs.mkdir(REPORTS_DIR, { recursive: true });
    } catch (e) {
      // Ignore
    }
  }

  async listReports() {
    await this.ensureDir();
    const files = await fs.readdir(REPORTS_DIR);
    const mdFiles = files.filter(f => f.endsWith('.md'));
    
    const reports = await Promise.all(mdFiles.map(async file => {
      const id = file.replace('.md', '');
      const raw = await fs.readFile(path.join(REPORTS_DIR, file), 'utf-8');
      const parsed = matter(raw);
      return {
        id,
        ...parsed.data,
        content: parsed.content.trim()
      };
    }));

    return reports;
  }

  async getReport(id: string) {
    const filePath = path.join(REPORTS_DIR, `${id}.md`);
    const raw = await fs.readFile(filePath, 'utf-8');
    const parsed = matter(raw);
    return {
      id,
      ...parsed.data,
      content: parsed.content.trim()
    };
  }

  async createReport(id: string, data: ReportData) {
    await this.ensureDir();
    const { content, ...meta } = data;
    const raw = matter.stringify(content, meta);
    const filePath = path.join(REPORTS_DIR, `${id}.md`);
    await fs.writeFile(filePath, raw);
    return { id, ...meta, content };
  }

  async updateReport(id: string, data: Partial<ReportData>) {
    const filePath = path.join(REPORTS_DIR, `${id}.md`);
    await fs.access(filePath); // Check if exists
    
    let raw = '';
    try {
      raw = await fs.readFile(filePath, 'utf-8');
    } catch (e) {
      // ignore
    }
    const parsed = raw ? matter(raw) : { data: {}, content: '' };

    const newContent = data.content !== undefined ? data.content : parsed.content;
    const newMeta = { ...parsed.data };
    
    // Copy any new meta keys
    for (const key of Object.keys(data)) {
      if (key !== 'content') {
        newMeta[key] = (data as any)[key];
      }
    }

    const newRaw = matter.stringify(newContent, newMeta);
    await fs.writeFile(filePath, newRaw);

    return { id, ...newMeta, content: newContent };
  }

  async deleteReport(id: string) {
    const filePath = path.join(REPORTS_DIR, `${id}.md`);
    await fs.access(filePath); // verify exists
    await fs.unlink(filePath);
  }
}
