import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from 'src/dto/reservations/Create-Reservation.dto';
import { ReservationExist } from '../interceptors/reservations/reservationAlreadyExist';
import { ReservationValidStatus } from 'src/interceptors/reservations/validStatus';
import { Reservation } from 'src/entities/Reservation.entity';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Reservations')
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all reservations' })
  async allReservations(): Promise<Reservation[]> {
    return await this.reservationsService.getAllReservations();
  }

  @Get('/getByStatus/:status')
  @UseInterceptors(ReservationValidStatus)
  @ApiOperation({ summary: 'Get reservations by status' })
  @ApiParam({
    name: 'status',
    type: String,
    description: 'Reservation status (e.g. PENDING, FINISHED)',
  })
  async getByStatus(@Param('status') status: string): Promise<Reservation[]> {
    return await this.reservationsService.getByStatus(status);
  }

  @Post('/schedule')
  @ApiOperation({ summary: 'Schedule a new reservation' })
  async scheduleReservation(
    @Body() data: CreateReservationDto,
  ): Promise<Object> {
    return await this.reservationsService.scheduleReservation(data);
  }

  @Patch('/cancel/:id')
  @UseInterceptors(ReservationExist)
  @HttpCode(200)
  @ApiOperation({ summary: 'Mark a reservation as cancelled' })
  @ApiParam({ name: 'id', type: String, description: 'Reservation ID' })
  async setStatusCancelled(@Param('id') id: string): Promise<Object> {
    return await this.reservationsService.setStatusCancelled(id);
  }

  @Patch('/finished/:id')
  @UseInterceptors(ReservationExist)
  @ApiOperation({ summary: 'Mark a reservation as finished' })
  @ApiParam({ name: 'id', type: String, description: 'Reservation ID' })
  @HttpCode(200)
  async setStatusFinished(@Param('id') id: string): Promise<Object> {
    return await this.reservationsService.setStatusFinished(id);
  }

  @Delete(':id')
  @UseInterceptors(ReservationExist)
  @ApiOperation({ summary: 'Delete a reservation by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Reservation ID' })
  async deleteReservation(@Param('id') id: string): Promise<Number> {
    // Cambiar
    return await this.reservationsService.deleteReservation(id);
  }
}
