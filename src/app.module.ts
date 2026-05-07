import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './config/database.config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { WarehousesModule } from './modules/warehouses/warehouses.module';
import { RentalsModule } from './modules/rentals/rentals.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: databaseConfig,
    }),
    UsersModule,
    AuthModule,
    WarehousesModule,
    RentalsModule,
  ],
})
export class AppModule {}