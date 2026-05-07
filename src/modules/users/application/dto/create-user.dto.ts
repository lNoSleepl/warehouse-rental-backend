import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'RafGreatLord@God.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Raf God' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'rafgod123', minLength: 6 })
  @IsString()
  @MinLength(6)
  password: string;
}