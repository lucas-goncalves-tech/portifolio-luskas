export interface RefreshTokenEntity {
  id: string; // UUID
  userId: number;
  expiresAt: Date;
}

export interface IAuthRepository {
  createRefreshToken(userId: number, expiresAt: Date): Promise<RefreshTokenEntity>;
  findRefreshTokenById(id: string): Promise<RefreshTokenEntity | null>;
  deleteRefreshTokenById(id: string): Promise<void>;
  deleteRefreshTokenByUserId(userId: number): Promise<void>;
}
