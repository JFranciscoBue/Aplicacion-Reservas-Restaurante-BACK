import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateContactDto } from 'src/dto/contacts/Create-Contact.dto';
import { ClientContact } from 'src/entities/ClientContact.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClientContactsService {
  constructor(
    @InjectRepository(ClientContact)
    private readonly clientContactsRepository: Repository<ClientContact>,
  ) {}

  async getAllContacts(): Promise<ClientContact[]> {
    return await this.clientContactsRepository.find();
  }

  async receiveContact(details: CreateContactDto): Promise<ClientContact> {
    const newContact = this.clientContactsRepository.create({
      fullname: details.fullname,
      phone: details.phone,
      reason: details.reason,
      message: details.message,
    });

    await this.clientContactsRepository.save(newContact);

    return newContact;
  }

  async deleteContact(id: string): Promise<Number> {
    const affectedRow = (await this.clientContactsRepository.delete(id))
      .affected;

    return affectedRow;
  }
}
