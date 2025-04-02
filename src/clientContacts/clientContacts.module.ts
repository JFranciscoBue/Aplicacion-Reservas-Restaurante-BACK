import { Module } from '@nestjs/common';
import { ClientContactsController } from './clientContacts.controller';
import { ClientContactsService } from './clientContacts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientContact } from 'src/entities/ClientContact.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClientContact])],
  controllers: [ClientContactsController],
  providers: [ClientContactsService],
})
export class ClientContactsModule {}
