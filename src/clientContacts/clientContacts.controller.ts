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
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Client Contacts')
@Controller('clientContacts')
export class ClientContactsController {
  constructor(private readonly clientsContactsService: ClientContactsService) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Get all contact messages from clients' })
  async getAllContacts(): Promise<ClientContact[]> {
    return await this.clientsContactsService.getAllContacts();
  }

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Receive a new contact message from a client' })
  async receiveContact(
    @Body() details: CreateContactDto,
  ): Promise<ClientContact> {
    return await this.clientsContactsService.receiveContact(details);
  }

  @Delete('/delete/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Delete a contact message by ID' })
  @ApiParam({ name: 'id', type: String, description: 'Contact ID' })
  async deleteContact(@Param('id') id: string): Promise<string> {
    const response = await this.clientsContactsService.deleteContact(id);

    if (response === 0) {
      throw new ConflictException('Cannot deleted de message. Try Again');
    } else if (response === 1) {
      return 'success';
    }
  }
}
