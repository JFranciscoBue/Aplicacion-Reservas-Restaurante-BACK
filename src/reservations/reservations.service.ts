import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReservationDto } from 'src/dto/reservations/Create-Reservation.dto';
import { Client } from 'src/entities/Client.entity';
import { Reservation } from 'src/entities/Reservation.entity';
import ReservationStatus from 'src/enums/ReservationStatus.enum';
import { Repository } from 'typeorm';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationsRepository: Repository<Reservation>,
    @InjectRepository(Client)
    private readonly clientsRepository: Repository<Client>,
  ) {}

  async getAllReservations(): Promise<Reservation[]> {
    return await this.reservationsRepository.find();
  }

  async getByStatus(status: string): Promise<Reservation[]> {
    const validStatus = Object.values(ReservationStatus).includes(
      status as ReservationStatus,
    )
      ? (status as ReservationStatus)
      : null;

    if (!validStatus) {
      throw new Error('Invalid reservation status');
    }

    return await this.reservationsRepository.find({
      where: { status: validStatus },
    });
  }

  async scheduleReservation(data: CreateReservationDto): Promise<object> {
    const { name, surname, phone } = data;

    let client = await this.clientsRepository.findOne({ where: { phone } });

    if (!client) {
      client = this.clientsRepository.create({ name, surname, phone });
      await this.clientsRepository.save(client);
    }

    const reservation = this.reservationsRepository.create({
      date: data.date,
      time: data.time,
      num_comensales: data.num_comensales,
      client_id: client,
    });
    await this.reservationsRepository.save(reservation);

    return {
      client,
      reservation,
    };
  }

  async setStatusCancelled(id: string): Promise<object> {
    const reservation = await this.reservationsRepository.findOne({
      where: { id },
    });

    if (!reservation) {
      throw new NotFoundException(`Reservation with id: ${id} does not exist`);
    }

    reservation.status = ReservationStatus.CANCELLED;
    await this.reservationsRepository.save(reservation);

    return { reservation };
  }

  async setStatusFinished(id: string): Promise<object> {
    const reservation = await this.reservationsRepository.findOne({
      where: { id },
    });

    if (!reservation) {
      throw new NotFoundException(`Reservation with id: ${id} does not exist`);
    }

    reservation.status = ReservationStatus.FINISHED;
    await this.reservationsRepository.save(reservation);

    return { reservation };
  }

  async deleteReservation(id: string): Promise<number> {
    return (await this.reservationsRepository.delete(id)).affected;
  }
}
