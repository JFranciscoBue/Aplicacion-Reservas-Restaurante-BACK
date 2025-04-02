import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { ClientContactsService } from './clientContacts.service';
import { CreateContactDto } from 'src/dto/contacts/Create-Contact.dto';
import { ClientContact } from 'src/entities/ClientContact.entity';

@Controller('clientContacts')
export class ClientContactsController {
  constructor(private readonly clientsContactsService: ClientContactsService) {}

  @Get()
  @HttpCode(200)
  async getAllContacts(): Promise<ClientContact[]> {
    return await this.clientsContactsService.getAllContacts();
  }

  @Post()
  @HttpCode(200)
  async receiveContact(
    @Body() details: CreateContactDto,
  ): Promise<ClientContact> {
    return await this.clientsContactsService.receiveContact(details);
  }

  @Delete('/delete/:id')
  @HttpCode(200)
  async deleteContact(@Param('id') id: string): Promise<String> {
    const response = await this.clientsContactsService.deleteContact(id);

    if (response === 0) {
      throw new ConflictException('Cannot deleted de message. Try Again');
    } else if (response === 1) {
      return 'success';
    }
  }
}
