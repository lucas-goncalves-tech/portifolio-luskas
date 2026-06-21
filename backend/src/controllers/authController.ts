import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { loginSchema } from '../validators/authValidator';
import { AuthService } from '../services/AuthService';

const prisma = new PrismaClient();

export const loginController = async (req: Request, res: Response): Promise<void> => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: 'Invalid body', details: parsed.error });
      return;
    }

    const { email, password } = parsed.data;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    try {
      const token = await AuthService.login(password, user.password);
      res.status(200).json({ token });
    } catch (e) {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
