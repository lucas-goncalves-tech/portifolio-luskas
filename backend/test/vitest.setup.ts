import 'reflect-metadata';
import { PrismaClient } from '@prisma/client';
import { beforeAll, afterAll } from 'vitest';

export let prismaTestClient: PrismaClient;

beforeAll(async () => {
  // Use the DATABASE_URL passed by globalSetup.ts
  const databaseUrl = process.env.DATABASE_URL;

  prismaTestClient = new PrismaClient({
    datasources: {
      db: { url: databaseUrl },
    },
  });
});

afterAll(async () => {
  if (prismaTestClient) {
    await prismaTestClient.$disconnect();
  }
});
