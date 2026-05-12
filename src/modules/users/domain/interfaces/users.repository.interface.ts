import { User } from '../user.entity';

export interface IUsersRepository {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  create(data: Partial<User>): Promise<User>;
  updateRole(id: string, role: string): Promise<User>;
}

export const USER_REPO_TOKEN = Symbol('IUsersRepository');
