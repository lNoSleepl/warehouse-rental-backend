import { PartialType } from '@nestjs/swagger';
import { CreateWarehouseDto } from './create-warehouse.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateWarehouseDto extends PartialType(CreateWarehouseDto) {
  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;
}
