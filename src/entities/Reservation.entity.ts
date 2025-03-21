import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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
  date: Date;

  @Column({
    type: 'date',
    nullable: false,
  })
  hour: Date;

  @Column({
    type: 'int',
    nullable: false,
  })
  num_comensales: number;

  @ManyToOne(() => Client, (client) => client.reservations)
  client_id: Client;
}
