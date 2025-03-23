import { Module } from '@nestjs/common';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from 'src/entities/Reservation.entity';
import { Client } from 'src/entities/Client.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, Client])],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
