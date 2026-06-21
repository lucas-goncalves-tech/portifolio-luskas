import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

export class AuthService {
  static async login(password: string, hash: string): Promise<string> {
    const isValid = await argon2.verify(hash, password);
    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
    return token;
  }
}
