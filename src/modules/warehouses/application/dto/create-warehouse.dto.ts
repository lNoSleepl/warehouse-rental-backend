import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateWarehouseDto {
  @ApiProperty({ example: 'Склад 1' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'ул. Садовникова, 184' })
  @IsString()
  address: string;

  @ApiProperty({ example: 6, description: 'Площадь в м²' })
  @IsNumber()
  @Min(1)
  size: number;

  @ApiProperty({ example: 1000, description: 'Цена за день в тенге' })
  @IsNumber()
  @Min(0)
  pricePerDay: number;

  @ApiPropertyOptional({ example: 'Дальний с правой стороны' })
  @IsOptional()
  @IsString()
  description: string;
}