import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { Admin } from 'src/entities/Admin.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminAlreadyExist implements NestInterceptor {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { body } = request;

    const adminExist = await this.adminRepository.findOne({
      where: { dni: body.dni },
    });

    if (!adminExist) {
      return next.handle();
    } else {
      throw new BadRequestException('Admin already exist. Try again');
    }
  }
}
