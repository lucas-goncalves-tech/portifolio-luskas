import { z } from 'zod';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('3000'),
  DATABASE_URL: z.string(),
  JWT_ACCESS_SECRET: z.string(),
  JWT_ACCESS_EXPIRES: z.string(),
  PEPPER: z.string(),
  ADMIN_EMAIL: z.string().email(),
  ADMIN_PASSWORD: z.string(),
  ADMIN_NAME: z.string(),
});

export const env = envSchema.parse(process.env);
