import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './application/users.service';
import { CreateUserDto } from './application/dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('users') // группа в Swagger
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiOperation({ summary: 'Регистрация нового пользователя' })
  register(@Body() dto: CreateUserDto) {
    return this.usersService.register(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Получить всех пользователей' })
  findAll() {
    return this.usersService.findAll();
  }
}
