import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rental } from '../domain/rental.entity';
import { IRentalsRepository } from '../domain/interfaces/rentals.repository.interface';

@Injectable()
export class RentalsRepository implements IRentalsRepository {
  constructor(
    @InjectRepository(Rental)
    private readonly repo: Repository<Rental>,
  ) {}

  async create(data: Partial<Rental>): Promise<Rental> {
    const rental = this.repo.create(data);
    return this.repo.save(rental);
  }

  async findAll(): Promise<Rental[]> {
    return this.repo.find({ relations: ['user', 'warehouse'] });
  }

  async findByUser(userId: string): Promise<Rental[]> {
    return this.repo.find({
      where: { userId },
      relations: ['warehouse'],
    });
  }

  async findById(id: string): Promise<Rental | null> {
    return this.repo.findOne({
      where: { id },
      relations: ['user', 'warehouse'],
    });
  }

  // Проверяем пересечение дат аренды для конкретного склада
  async findConflicting(
    warehouseId: string,
    startDate: string,
    endDate: string,
  ): Promise<Rental[]> {
    return this.repo
      .createQueryBuilder('rental')
      .where('rental.warehouseId = :warehouseId', { warehouseId })
      .andWhere('rental.status = :status', { status: 'active' })
      .andWhere('rental.startDate <= :endDate', { endDate })
      .andWhere('rental.endDate >= :startDate', { startDate })
      .getMany();
  }

  async updateStatus(id: string, status: string): Promise<Rental> {
    await this.repo.update(id, { status } as any);
    return this.findById(id) as Promise<Rental>;
  }
}