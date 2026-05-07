import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'RafGreatLord@God.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'rafgod123' })
  @IsString()
  password: string;
}