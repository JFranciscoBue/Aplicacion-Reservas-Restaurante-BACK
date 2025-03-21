import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { v7 as uuid } from 'uuid';
import { Reservation } from './Reservation.entity';

@Entity({
  name: 'clients',
})
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({
    nullable: false,
    length: 55,
    type: 'varchar',
  })
  name: string;

  @Column({
    nullable: false,
    length: 55,
    type: 'varchar',
  })
  surname: string;

  @Column({
    nullable: false,
    // length: 55,
    type: 'varchar',
  })
  phone: string;

  @OneToMany(() => Reservation, (reservation) => reservation.client_id)
  reservations: Reservation[];
}
