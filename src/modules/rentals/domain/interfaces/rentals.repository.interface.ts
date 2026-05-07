import { Rental } from '../rental.entity';

export interface IRentalsRepository {
  create(data: Partial<Rental>): Promise<Rental>;
  findAll(): Promise<Rental[]>;
  findByUser(userId: string): Promise<Rental[]>;
  findById(id: string): Promise<Rental | null>;
  findConflicting(warehouseId: string, startDate: string, endDate: string): Promise<Rental[]>;
  updateStatus(id: string, status: string): Promise<Rental>;
}
