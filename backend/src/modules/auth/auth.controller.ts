import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'tsyringe';
import { AuthService } from './auth.service';
import { LoginRequest, RefreshTokenRequest } from './dtos/AuthRequest.dto';

@injectable()
export class AuthController {
  constructor(@inject(AuthService) private authService: AuthService) {}

  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const loginData = req.body as LoginRequest;
      const { response, refreshToken } = await this.authService.login(loginData);

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  refresh = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const refreshTokenId = req.cookies?.refreshToken;
      if (!refreshTokenId) {
        res.status(401).json({ success: false, message: 'No refresh token provided' });
        return;
      }

      const { response, refreshToken } = await this.authService.refresh(refreshTokenId);

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json(response);
    } catch (error) {
      res.clearCookie('refreshToken');
      next(error);
    }
  };

  logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const refreshTokenId = req.cookies?.refreshToken;
      if (refreshTokenId) {
        await this.authService.logout(refreshTokenId);
      }

      res.clearCookie('refreshToken');
      res.status(200).json({ success: true, message: 'Logged out successfully' });
    } catch (error) {
      next(error);
    }
  };
}
