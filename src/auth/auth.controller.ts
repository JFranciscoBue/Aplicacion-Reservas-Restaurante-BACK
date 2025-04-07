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
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/new')
  @HttpCode(200)
  @UseInterceptors(AdminAlreadyExist)
  @ApiOperation({ summary: 'Register a new Admin' })
  async signUpAdmin(@Body() data: CreateAdminDto): Promise<object> {
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
  @ApiOperation({ summary: 'Login for an Admin' })
  @HttpCode(200)
  async signInAdmin(@Body() data: LoginAdminDto): Promise<object> {
    try {
      const response = await this.authService.signInAdmin(data);

      return response;
    } catch (e) {
      console.error(e);
      throw new BadRequestException('Invalid credentials');
    }
  }
}
