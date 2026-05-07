import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { RentalsRepository } from '../infrastructure/rentals.repository';
import { WarehousesService } from '../../warehouses/application/warehouses.service';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalStatusDto } from './dto/update-rental-status.dto';
import { IRentalsService } from '../domain/interfaces/rental.service.interface';

@Injectable()
export class RentalsService implements IRentalsService {
  constructor(
    private readonly rentalsRepository: RentalsRepository,
    private readonly warehousesService: WarehousesService,
  ) {}

  async create(userId: string, dto: CreateRentalDto) {
    const warehouse = await this.warehousesService.findById(dto.warehouseId);

    if (!warehouse.isAvailable) {
      throw new BadRequestException('Склад недоступен для аренды');
    }

    const conflicts = await this.rentalsRepository.findConflicting(
      dto.warehouseId,
      dto.startDate,
      dto.endDate,
    );
    if (conflicts.length > 0) {
      throw new BadRequestException('Склад уже арендован на эти даты');
    }

    const start = new Date(dto.startDate);
    const end = new Date(dto.endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

    if (days <= 0) {
      throw new BadRequestException('Дата окончания должна быть позже даты начала');
    }

    const totalPrice = days * Number(warehouse.pricePerDay);

    const rental = await this.rentalsRepository.create({
      userId,
      warehouseId: dto.warehouseId,
      startDate: dto.startDate,
      endDate: dto.endDate,
      totalPrice,
    });

    await this.warehousesService.update(dto.warehouseId, { isAvailable: false });

    return rental;
  }

  async updateStatus(id: string, dto: UpdateRentalStatusDto) {
    const rental = await this.findById(id);
    const updated = await this.rentalsRepository.updateStatus(id, dto.status);

    if (dto.status === 'completed' || dto.status === 'cancelled') {
      await this.warehousesService.update(rental.warehouseId, { isAvailable: true });
    }

    return updated;
  }

  async findAll() {
    return this.rentalsRepository.findAll();
  }

  async findMyRentals(userId: string) {
    return this.rentalsRepository.findByUser(userId);
  }

  async findById(id: string) {
    const rental = await this.rentalsRepository.findById(id);
    if (!rental) throw new NotFoundException(`Аренда ${id} не найдена`);
    return rental;
  }
}
