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

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get()
  async allReservations() {
    return await this.reservationsService.getAllReservations();
  }

  @Get('/getByStatus/:status')
  async getByStatus(@Param('status') status: string) {
    return await this.reservationsService.getByStatus(status);
  }

  @Post('/schedule')
  async scheduleReservation(@Body() data: CreateReservationDto) {
    return await this.reservationsService.scheduleReservation(data);
  }

  @Patch('/cancel/:id')
  @UseInterceptors(ReservationExist)
  @HttpCode(200)
  async setStatusCancelled(@Param('id') id: string) {
    return await this.reservationsService.setStatusCancelled(id);
  }

  @Patch('/finished/:id')
  @UseInterceptors(ReservationExist)
  @HttpCode(200)
  async setStatusFinished(@Param('id') id: string) {
    return await this.reservationsService.setStatusFinished(id);
  }

  @Delete(':id')
  @UseInterceptors(ReservationExist)
  async deleteReservation(@Param('id') id: string) {
    return await this.reservationsService.deleteReservation(id);
  }
}
