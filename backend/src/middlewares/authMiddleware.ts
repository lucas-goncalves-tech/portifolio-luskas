import { Request, Response, NextFunction } from 'express';
import { JwtService } from '../modules/auth/security/JwtService';
import { UnauthorizedException } from '../core/exceptions/UnauthorizedException';

interface AuthRequest extends Request {
  user?: any;
}

const jwtService = new JwtService();

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthorizedException('Token missing');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwtService.verifyAccessToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    throw new UnauthorizedException('Token invalid');
  }
};
