import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/entities/Admin.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  async getAdmins(): Promise<Admin[]> {
    return await this.adminRepository.find();
  }

  async getOneAdmin(id: string): Promise<Admin> {
    return await this.adminRepository.findOneOrFail({ where: { id } });
  }

  async updateKey(id: string, key: string): Promise<Admin> {
    try {
      const admin = await this.getOneAdmin(id);

      const hashedKey = await bcrypt.hash(key, 10);

      await this.adminRepository.update(admin.id, { key: hashedKey });

      const adminUpdated = await this.getOneAdmin(id);

      return adminUpdated;
    } catch (error) {
      throw error;
    }
  }

  async deleteAdmin(id: string): Promise<number> {
    const affectedRows = (await this.adminRepository.delete(id)).affected;

    return affectedRows;
  }
}
