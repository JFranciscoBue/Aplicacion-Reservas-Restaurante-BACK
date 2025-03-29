import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from 'src/dto/reservations/Create-Reservation.dto';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get()
  async allReservations() {
    return await this.reservationsService.getAllReservations();
  }

  @Post('/schedule')
  async scheduleReservation(@Body() data: CreateReservationDto) {
    return await this.reservationsService.scheduleReservation(data);
  }

  @Delete(':id')
  async deleteReservation(@Param('id') id: string) {
    return await this.reservationsService.deleteReservation(id);
  }
}
