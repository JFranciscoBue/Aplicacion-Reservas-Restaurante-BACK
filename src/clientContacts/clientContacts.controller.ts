import { Body, Controller, Post } from '@nestjs/common';
import { ClientContactsService } from './clientContacts.service';
import { CreateContactDto } from 'src/dto/contacts/Create-Contact.dto';
import { ClientContact } from 'src/entities/ClientContact.entity';

@Controller('clientContacts')
export class ClientContactsController {
  constructor(private readonly clientsContactsService: ClientContactsService) {}

  @Post()
  async receiveContact(
    @Body() details: CreateContactDto,
  ): Promise<ClientContact> {
    return await this.clientsContactsService.receiveContact(details);
  }
}
