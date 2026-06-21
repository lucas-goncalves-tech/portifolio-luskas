import { injectable } from 'tsyringe';
import { prisma } from '../../core/database/prisma';
import { IUserRepository, UserEntity } from './interfaces/user.interface.ts';

@injectable()
export class UserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    
    if (!user) return null;
    
    return {
      id: user.id,
      email: user.email,
      name: (user as any).name || null,
      passwordHash: user.password,
    };
  }

  async findById(id: number): Promise<UserEntity | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    
    if (!user) return null;
    
    return {
      id: user.id,
      email: user.email,
      name: (user as any).name || null,
      passwordHash: user.password,
    };
  }
}
