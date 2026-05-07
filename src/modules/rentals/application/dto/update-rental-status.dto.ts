import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { RentalStatus } from '../../domain/rental.entity';

export class UpdateRentalStatusDto {
  @ApiProperty({ enum: RentalStatus, example: RentalStatus.CANCELLED })
  @IsEnum(RentalStatus)
  status: RentalStatus;
}