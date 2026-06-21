import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { execSync } from 'child_process';

let container: StartedPostgreSqlContainer;

export async function setup() {
  container = await new PostgreSqlContainer('postgres:15-alpine')
    .withDatabase('testdb')
    .withUsername('testuser')
    .withPassword('testpass')
    .start();

  const databaseUrl = container.getConnectionUri();
  
  process.env.DATABASE_URL = databaseUrl;
  
  execSync('npx prisma db push', { env: { ...process.env, DATABASE_URL: databaseUrl }, stdio: 'inherit' });
}

export async function teardown() {
  if (container) {
    await container.stop();
  }
}
