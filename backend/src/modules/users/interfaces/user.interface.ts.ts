export interface UserEntity {
  id: number;
  email: string;
  name: string | null;
  passwordHash: string;
}

export interface IUserRepository {
  findByEmail(email: string): Promise<UserEntity | null>;
  findById(id: number): Promise<UserEntity | null>;
}
