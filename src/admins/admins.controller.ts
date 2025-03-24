import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
} from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from 'src/dto/admin/Create-Admin.dto';
import { EntityNotFoundError } from 'typeorm';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Get()
  async getAllAdmins() {
    return await this.adminsService.getAdmins();
  }

  @Get(':id')
  async getOneAdmin(@Param('id') id: string) {
    try {
      return await this.adminsService.getOneAdmin(id);
    } catch (error) {
      throw new NotFoundException(
        `Admin with id ${id} does not exits. Try again`,
      );
    }
  }

  @Patch('/changeKey/:id')
  async updateKey(
    @Param('id') id: string,
    @Body() data: Partial<CreateAdminDto>,
  ) {
    try {
      const adminUpdated = await this.adminsService.updateKey(id, data.key);

      return {
        message: 'Key updated successfully',
        adminUpdated,
      };
    } catch (error) {
      console.log(error);
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('Admin does not exist. Try Again');
      }
      throw new ConflictException('Cannot update the key. Try Again');
    }
  }

  @Delete(':id')
  async deleteAdmin(@Param('id') id: string) {
    try {
      const adminDeleted = await this.adminsService.deleteAdmin(id);

      if (adminDeleted === 0) {
        throw new Error();
      }

      return {
        message: 'Admin deleted successfully',
      };
    } catch (error) {
      throw new ConflictException('Cannot delet the admins. Try Again');
    }
  }
}
