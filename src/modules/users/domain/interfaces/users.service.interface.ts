import { User } from '../user.entity';
import { CreateUserDto } from '../../application/dto/create-user.dto';

export interface IUsersService {
  register(dto: CreateUserDto): Promise<Omit<User, 'password'>>;
  findAll(): Promise<User[]>;
  findByEmail(email: string): Promise<User | null>;
  updateRole(id: string, role: string): Promise<User>;
}