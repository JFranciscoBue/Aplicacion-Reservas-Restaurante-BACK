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
import { Admin } from 'src/entities/Admin.entity';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Admins')
@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all Admins' })
  async getAllAdmins(): Promise<Admin[]> {
    return await this.adminsService.getAdmins();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get ONE Admin By ID' })
  @ApiParam({ name: 'id', type: String, description: 'Admin ID' })
  async getOneAdmin(@Param('id') id: string): Promise<Admin> {
    try {
      return await this.adminsService.getOneAdmin(id);
    } catch (e) {
      console.error(e);
      throw new NotFoundException(
        `Admin with id ${id} does not exits. Try again`,
      );
    }
  }

  @Patch('/changeKey/:id')
  @ApiOperation({ summary: 'Change the key of one Admin' })
  @ApiParam({ name: 'id', type: String, description: 'Admin ID' })
  async updateKey(
    @Param('id') id: string,
    @Body() data: Partial<CreateAdminDto>,
  ): Promise<Object> {
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
  @ApiOperation({ summary: 'Delete one Admin By ID' })
  @ApiParam({ name: 'id', type: String, description: 'Admin ID' })
  async deleteAdmin(@Param('id') id: string): Promise<Object> {
    try {
      const adminDeleted = await this.adminsService.deleteAdmin(id);

      if (adminDeleted === 0) {
        throw new Error();
      }

      return {
        message: 'Admin deleted successfully',
      };
    } catch (e) {
      console.error(e);
      throw new ConflictException('Cannot delete the admins. Try Again');
    }
  }
}
