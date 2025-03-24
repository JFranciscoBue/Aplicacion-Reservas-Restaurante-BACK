import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAdminDto } from 'src/dto/admin/Create-Admin.dto';
import { Admin } from 'src/entities/Admin.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginAdminDto } from 'src/dto/admin/Login-Admin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private readonly jwt: JwtService,
  ) {}

  async signUpAdmin(data: CreateAdminDto): Promise<Admin> {
    const hashedKey = await bcrypt.hash(data.key, 10);

    const newAdmin = this.adminRepository.create({
      name: data.name,
      surname: data.surname,
      email: data.email,
      key: hashedKey,
      dni: data.dni,
      phone: data.phone,
    });

    await this.adminRepository.save(newAdmin);

    return newAdmin;
  }

  async signInAdmin(data: LoginAdminDto): Promise<string> {
    const adminFound = await this.adminRepository.findOneOrFail({
      where: { dni: data.dni },
    });

    const validKey = await bcrypt.compare(data.key, adminFound.key);

    if (validKey) {
      const token = this.jwt.sign({
        user: adminFound.id,
        email: adminFound.email,
      });

      return token;
    }

    throw new Error();
  }
}
