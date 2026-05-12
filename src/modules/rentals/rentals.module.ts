import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rental } from './domain/rental.entity';
import { RentalsController } from './rentals.controller';
import { RentalsService } from './application/rentals.service';
import { RentalsRepository } from './infrastructure/rentals.repository';
import { WarehousesModule } from '../warehouses/warehouses.module';
import { RENTAL_REPO_TOKEN } from './domain/interfaces/rentals.repository.interface';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rental]),
    WarehousesModule,
  ],
  controllers: [RentalsController],
  providers: [
    RentalsService,
    {
      provide: RENTAL_REPO_TOKEN,
      useClass: RentalsRepository,
    },
  ],
})
export class RentalsModule {}
