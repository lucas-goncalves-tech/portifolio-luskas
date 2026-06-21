import { z } from 'zod';

export const LoginRequestSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>['body'];

export const RefreshTokenRequestSchema = z.object({
  cookies: z.object({
    refreshToken: z.string().uuid(),
  }),
});

export type RefreshTokenRequest = z.infer<typeof RefreshTokenRequestSchema>['cookies'];
