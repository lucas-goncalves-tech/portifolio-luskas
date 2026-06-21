import * as argon2 from 'argon2';
import { injectable, inject } from 'tsyringe';
import { UserRepository } from '../users/UserRepository';
import { AuthRepository } from './auth.repository';
import { JwtService } from './security/JwtService';
import { LoginRequest } from './dtos/AuthRequest.dto';
import { AuthResponse } from './dtos/AuthResponse.dto';
import { UnauthorizedException } from '../../core/exceptions/UnauthorizedException';
import { env } from '../../core/config/env';

@injectable()
export class AuthService {
  constructor(
    @inject(UserRepository) private userRepository: UserRepository,
    @inject(AuthRepository) private authRepository: AuthRepository,
    @inject(JwtService) private jwtService: JwtService
  ) {}

  async login(data: LoginRequest): Promise<{ response: AuthResponse; refreshToken: string }> {
    const user = await this.userRepository.findByEmail(data.email);
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const pepperedPassword = data.password + env.PEPPER;
    
    const isValid = await argon2.verify(user.passwordHash, pepperedPassword);
    
    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.jwtService.generateAccessToken(user.id, user.email);
    
    await this.authRepository.deleteRefreshTokenByUserId(user.id);
    
    const expiresAt = this.jwtService.getRefreshTokenExpiration();
    const tokenEntity = await this.authRepository.createRefreshToken(user.id, expiresAt);

    return {
      response: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        accessToken,
      },
      refreshToken: tokenEntity.id,
    };
  }

  async refresh(refreshTokenId: string): Promise<{ response: AuthResponse; refreshToken: string }> {
    const tokenEntity = await this.authRepository.findRefreshTokenById(refreshTokenId);
    
    if (!tokenEntity || tokenEntity.expiresAt < new Date()) {
      if (tokenEntity) {
        await this.authRepository.deleteRefreshTokenById(refreshTokenId);
      }
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    const user = await this.userRepository.findById(tokenEntity.userId);
    
    if (!user) {
      throw new UnauthorizedException('User no longer exists');
    }

    await this.authRepository.deleteRefreshTokenById(refreshTokenId);
    
    const accessToken = this.jwtService.generateAccessToken(user.id, user.email);
    const expiresAt = this.jwtService.getRefreshTokenExpiration();
    const newTokenEntity = await this.authRepository.createRefreshToken(user.id, expiresAt);

    return {
      response: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        accessToken,
      },
      refreshToken: newTokenEntity.id,
    };
  }

  async logout(refreshTokenId: string): Promise<void> {
    await this.authRepository.deleteRefreshTokenById(refreshTokenId);
  }
}
