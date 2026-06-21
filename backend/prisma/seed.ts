import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2';
import { env } from '../src/core/config/env';

const prisma = new PrismaClient();

async function main() {
  const email = env.ADMIN_EMAIL;
  const password = env.ADMIN_PASSWORD;
  const name = env.ADMIN_NAME;

  const hashedPassword = await argon2.hash(password);

  const admin = await prisma.user.upsert({
    where: { email },
    update: {
      name,
      password: hashedPassword,
    },
    create: {
      email,
      name,
      password: hashedPassword,
    },
  });

  console.log('Admin user seeded:', admin.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
