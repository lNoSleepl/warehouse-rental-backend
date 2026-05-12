import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';
import { IWarehousesService } from '../domain/interfaces/warehouses.service.interface';
import { WAREHOUSE_REPO_TOKEN } from '../domain/interfaces/warehouses.repository.interface';
import type { IWarehousesRepository } from '../domain/interfaces/warehouses.repository.interface';

@Injectable()
export class WarehousesService implements IWarehousesService {
  constructor(
    @Inject(WAREHOUSE_REPO_TOKEN)
    private readonly warehousesRepository: IWarehousesRepository,
  ) {}

  async create(dto: CreateWarehouseDto) {
    return this.warehousesRepository.create(dto);
  }

  async findAll() {
    return this.warehousesRepository.findAll();
  }

  async findAvailable() {
    return this.warehousesRepository.findAvailable();
  }

  async findById(id: string) {
    const warehouse = await this.warehousesRepository.findById(id);
    if (!warehouse) throw new NotFoundException(`Склад ${id} не найден`);
    return warehouse;
  }

  async update(id: string, dto: UpdateWarehouseDto) {
    await this.findById(id);
    return this.warehousesRepository.update(id, dto);
  }

  async delete(id: string) {
    await this.findById(id);
    await this.warehousesRepository.delete(id);
    return { message: 'Склад удалён' };
  }
}
