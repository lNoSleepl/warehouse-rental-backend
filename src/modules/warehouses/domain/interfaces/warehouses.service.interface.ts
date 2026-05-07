import { Warehouse } from '../warehouse.entity';
import { CreateWarehouseDto } from '../../application/dto/create-warehouse.dto';
import { UpdateWarehouseDto } from '../../application/dto/update-warehouse.dto';

export interface IWarehousesService {
  create(dto: CreateWarehouseDto): Promise<Warehouse>;
  findAll(): Promise<Warehouse[]>;
  findAvailable(): Promise<Warehouse[]>;
  findById(id: string): Promise<Warehouse>;
  update(id: string, dto: UpdateWarehouseDto): Promise<Warehouse>;
  delete(id: string): Promise<{ message: string }>;
}
