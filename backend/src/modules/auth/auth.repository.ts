import { injectable } from 'tsyringe';
import { prisma } from '../../core/database/prisma';
import { IAuthRepository, RefreshTokenEntity } from './interfaces/auth.interface';

@injectable()
export class AuthRepository implements IAuthRepository {
  async createRefreshToken(userId: number, expiresAt: Date): Promise<RefreshTokenEntity> {
    const token = await prisma.refreshToken.create({
      data: {
        userId,
        expiresAt,
      },
    });
    
    return {
      id: token.id,
      userId: token.userId,
      expiresAt: token.expiresAt,
    };
  }

  async findRefreshTokenById(id: string): Promise<RefreshTokenEntity | null> {
    const token = await prisma.refreshToken.findUnique({
      where: { id },
    });
    
    if (!token) return null;
    
    return {
      id: token.id,
      userId: token.userId,
      expiresAt: token.expiresAt,
    };
  }

  async deleteRefreshTokenById(id: string): Promise<void> {
    await prisma.refreshToken.delete({
      where: { id },
    });
  }

  async deleteRefreshTokenByUserId(userId: number): Promise<void> {
    await prisma.refreshToken.deleteMany({
      where: { userId },
    });
  }
}
