import { Rental } from '../rental.entity';
import { CreateRentalDto } from '../../application/dto/create-rental.dto';
import { UpdateRentalStatusDto } from '../../application/dto/update-rental-status.dto';

export interface IRentalsService {
  create(userId: string, dto: CreateRentalDto): Promise<Rental>;
  findAll(): Promise<Rental[]>;
  findMyRentals(userId: string): Promise<Rental[]>;
  findById(id: string): Promise<Rental>;
  updateStatus(id: string, dto: UpdateRentalStatusDto): Promise<Rental>;
}
