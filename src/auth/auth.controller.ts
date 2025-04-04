import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAdminDto } from 'src/dto/admin/Create-Admin.dto';
import { AdminAlreadyExist } from 'src/interceptors/auth/SignUpAdmin';
import { LoginAdminDto } from 'src/dto/admin/Login-Admin.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/new')
  @UseInterceptors(AdminAlreadyExist)
  async signUpAdmin(@Body() data: CreateAdminDto): Promise<Object> {
    try {
      const newAdmin = await this.authService.signUpAdmin(data);

      return {
        message: 'Admin registered successfully',
        newAdmin,
      };
    } catch (error) {
      throw new ConflictException(error.message);
    }
  }

  @Post('/login')
  @HttpCode(200)
  async signInAdmin(@Body() data: LoginAdminDto): Promise<Object> {
    try {
      const response = await this.authService.signInAdmin(data);

      return response;
    } catch (error) {
      throw new BadRequestException('Invalid credentials');
    }
  }
}
