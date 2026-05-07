import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Warehouse } from './domain/warehouse.entity';
import { WarehousesController } from './warehouses.controller';
import { WarehousesService } from './application/warehouses.service';
import { WarehousesRepository } from './infrastructure/warehouses.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Warehouse])],
  controllers: [WarehousesController],
  providers: [WarehousesService, WarehousesRepository],
  exports: [WarehousesService],
})
export class WarehousesModule {}
