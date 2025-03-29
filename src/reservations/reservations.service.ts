import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReservationDto } from 'src/dto/reservations/Create-Reservation.dto';
import { Client } from 'src/entities/Client.entity';
import { Reservation } from 'src/entities/Reservation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationsRepository: Repository<Reservation>,
    @InjectRepository(Client)
    private readonly clientsRepository: Repository<Client>,
  ) {}

  async getAllReservations() {
    return await this.reservationsRepository.find();
  }

  async scheduleReservation(data: CreateReservationDto): Promise<Object> {
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

  async deleteReservation(id: string): Promise<Number> {
    return (await this.reservationsRepository.delete(id)).affected;
  }
}
