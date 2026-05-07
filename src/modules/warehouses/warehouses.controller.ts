import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { WarehousesService } from './application/warehouses.service';
import { CreateWarehouseDto } from './application/dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './application/dto/update-warehouse.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@ApiTags('warehouses')
@Controller('warehouses')
export class WarehousesController {
  constructor(private readonly warehousesService: WarehousesService) {}

  @Get()
  @ApiOperation({ summary: 'Все склады' })
  findAll() {
    return this.warehousesService.findAll();
  }

  @Get('available')
  @ApiOperation({ summary: 'Свободные склады' })
  findAvailable() {
    return this.warehousesService.findAvailable();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Склад по ID' })
  findById(@Param('id') id: string) {
    return this.warehousesService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard) // оба guard-а
  @Roles('admin') // только админ
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Создать склад (admin)' })
  create(@Body() dto: CreateWarehouseDto) {
    return this.warehousesService.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Обновить склад (admin)' })
  update(@Param('id') id: string, @Body() dto: UpdateWarehouseDto) {
    return this.warehousesService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Удалить склад (admin)' })
  delete(@Param('id') id: string) {
    return this.warehousesService.delete(id);
  }
}