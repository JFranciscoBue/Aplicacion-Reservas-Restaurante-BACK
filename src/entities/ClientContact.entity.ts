import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v7 as uuid } from 'uuid';

@Entity({
  name: 'contacts',
})
export class ClientContact {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuid();

  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
  })
  fullname: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 15,
  })
  phone: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  reason: string;

  @Column({
    nullable: false,
  })
  message: string;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;
}
