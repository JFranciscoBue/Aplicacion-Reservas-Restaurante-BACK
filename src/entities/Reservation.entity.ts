import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { v7 as uuid } from 'uuid';
import { Client } from './Client.entity';

@Entity({
  name: 'reservations',
})
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({
    type: 'date',
    nullable: false,
  })
  date: string;

  @Column({
    type: 'time',
    nullable: false,
  })
  time: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  num_comensales: number;

  @ManyToOne(() => Client, (client) => client.reservations)
  @JoinColumn({ name: 'client_id' })
  client_id: Client;
}
