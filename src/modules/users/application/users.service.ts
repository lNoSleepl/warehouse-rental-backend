import { Injectable, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UsersRepository } from '../infrastructure/users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from '../domain/user.entity';
import { IUsersService } from '../domain/interfaces/users.service.interface';

@Injectable()
export class UsersService implements IUsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async register(dto: CreateUserDto): Promise<Omit<User, 'password'>> {
    // Проверяем что email не занят
    const existing = await this.usersRepository.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('Пользователь с таким email уже существует');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.usersRepository.create({
      ...dto,
      password: hashedPassword,
    });

    const { password, ...result } = user;
    return result;
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findByEmail(email);
  }

  async updateRole(id: string, role: string): Promise<User> {
    return this.usersRepository.updateRole(id, role);
  }
}
