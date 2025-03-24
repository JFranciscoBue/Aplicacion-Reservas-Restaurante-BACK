import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v7 as uuid } from 'uuid';

@Entity({
  name: 'admins',
})
export class Admin {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({
    type: 'varchar',
    nullable: false,
    length: 50,
  })
  name: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 50,
  })
  surname: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 50,
  })
  phone: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 8,
  })
  dni: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  key: string;
}
