import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Warehouse } from './domain/warehouse.entity';
import { WarehousesController } from './warehouses.controller';
import { WarehousesService } from './application/warehouses.service';
import { WarehousesRepository } from './infrastructure/warehouses.repository';
import { WAREHOUSE_REPO_TOKEN } from './domain/interfaces/warehouses.repository.interface';

@Module({
  imports: [TypeOrmModule.forFeature([Warehouse])],
  controllers: [WarehousesController],
  providers: [
    WarehousesService,
    {
      provide: WAREHOUSE_REPO_TOKEN,
      useClass: WarehousesRepository,
    },
  ],
  exports: [WarehousesService],
})
export class WarehousesModule {}
