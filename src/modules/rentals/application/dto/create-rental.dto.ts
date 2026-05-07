import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsDateString } from 'class-validator';

export class CreateRentalDto {
  @ApiProperty({ example: 'uuid-склада' })
  @IsString()
  warehouseId: string;

  @ApiProperty({ example: '2026-05-01' })
  @IsDateString()
  startDate: string;

  @ApiProperty({ example: '2026-05-10' })
  @IsDateString()
  endDate: string;
}