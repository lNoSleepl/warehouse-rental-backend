import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { Rental } from "src/modules/rentals/domain/rental.entity";

@Entity('warehouse')
export class Warehouse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column('float')
  size: number; // площадь в м²

  @Column('decimal', { precision: 10, scale: 2 })
  pricePerDay: number;

  @Column({ default: true })
  isAvailable: boolean;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Rental, (rental) => rental.warehouse)
  rentals: Rental[];

  @CreateDateColumn()
  createdAt: Date;
}