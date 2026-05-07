import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Warehouse } from '../domain/warehouse.entity';
import { IWarehousesRepository } from '../domain/interfaces/warehouses.repository.interface';

@Injectable()
export class WarehousesRepository implements IWarehousesRepository {
  constructor(
    @InjectRepository(Warehouse)
    private readonly repo: Repository<Warehouse>,
  ) {}

  async findAll(): Promise<Warehouse[]> {
    return this.repo.find();
  }

  async findAvailable(): Promise<Warehouse[]> {
    return this.repo.find({ where: { isAvailable: true } });
  }

  async findById(id: string): Promise<Warehouse | null> {
    return this.repo.findOne({ where: { id } });
  }

  async create(data: Partial<Warehouse>): Promise<Warehouse> {
    const warehouse = this.repo.create(data);
    return this.repo.save(warehouse);
  }

  async update(id: string, data: Partial<Warehouse>): Promise<Warehouse> {
    await this.repo.update(id, data);
    return this.findById(id) as Promise<Warehouse>;
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
