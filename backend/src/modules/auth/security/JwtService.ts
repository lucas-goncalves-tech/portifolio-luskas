import jwt from 'jsonwebtoken';
import { injectable } from 'tsyringe';
import { env } from '../../../core/config/env';

@injectable()
export class JwtService {
  generateAccessToken(userId: number, email: string): string {
    return jwt.sign(
      { userId, email },
      env.JWT_ACCESS_SECRET,
      { expiresIn: env.JWT_ACCESS_EXPIRES as jwt.SignOptions['expiresIn'] }
    );
  }

  getRefreshTokenExpiration(): Date {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);
    return expirationDate;
  }
  
  verifyAccessToken(token: string): any {
    return jwt.verify(token, env.JWT_ACCESS_SECRET);
  }
}
