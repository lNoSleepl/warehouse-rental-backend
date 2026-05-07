import {
  Entity, PrimaryGeneratedColumn, Column,
  CreateDateColumn, ManyToOne, JoinColumn
} from 'typeorm';
import { User } from '../../users/domain/user.entity';
import { Warehouse } from '../../warehouses/domain/warehouse.entity';

export enum RentalStatus {
  ACTIVE = 'active',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

@Entity('rentals')
export class Rental {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @ManyToOne(() => Warehouse, (warehouse) => warehouse.rentals)
  @JoinColumn({ name: 'warehouseId' })
  warehouse: Warehouse;

  @Column()
  warehouseId: string;

  @Column({ type: 'date' })
  startDate: string;

  @Column({ type: 'date' })
  endDate: string;

  @Column('decimal', { precision: 10, scale: 2 })
  totalPrice: number;

  @Column({ type: 'enum', enum: RentalStatus, default: RentalStatus.ACTIVE })
  status: RentalStatus;

  @CreateDateColumn()
  createdAt: Date;
}