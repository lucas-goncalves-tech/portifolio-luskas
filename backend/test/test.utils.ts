import { prismaTestClient } from './vitest.setup';

export async function clearDatabase() {
  // Delete all data. Order matters if there are relations, or we can just delete from all tables.
  const tableNames = await prismaTestClient.$queryRaw<
    Array<{ tablename: string }>
  >`SELECT tablename FROM pg_tables WHERE schemaname='public'`;

  const tables = tableNames
    .map(({ tablename }) => tablename)
    .filter(t => t !== '_prisma_migrations')
    .map(name => `"${name}"`)
    .join(', ');

  try {
    await prismaTestClient.$executeRawUnsafe(`TRUNCATE TABLE ${tables} CASCADE;`);
  } catch (error) {
    console.log({ error });
  }
}
