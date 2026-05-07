import { Controller, Get, Post, Patch, Body, Param, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RentalsService } from './application/rentals.service';
import { CreateRentalDto } from './application/dto/create-rental.dto';
import { UpdateRentalStatusDto } from './application/dto/update-rental-status.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { RequestUser } from '../auth/interfaces/jwt-payload.interface';

@ApiTags('rentals')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('rentals')
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  @Post()
  @ApiOperation({ summary: 'Арендовать склад' })
  create(@Request() req: { user: RequestUser }, @Body() dto: CreateRentalDto) {
    return this.rentalsService.create(req.user.userId, dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Все аренды ' })
  findAll() {
    return this.rentalsService.findAll();
  }

  @Get('my')
  @ApiOperation({ summary: 'Мои аренды' })
  findMy(@Request() req: { user: RequestUser }) {
    return this.rentalsService.findMyRentals(req.user.userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Аренда по ID' })
  findById(@Param('id') id: string) {
    return this.rentalsService.findById(id);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Изменить статус аренды' })
  updateStatus(@Param('id') id: string, @Body() dto: UpdateRentalStatusDto) {
    return this.rentalsService.updateStatus(id, dto);
  }
}
