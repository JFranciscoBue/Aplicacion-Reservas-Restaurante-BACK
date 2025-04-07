import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { Reservation } from 'src/entities/Reservation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReservationExist implements NestInterceptor {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationsRepository: Repository<Reservation>,
  ) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { id } = request.params;

    try {
      await this.reservationsRepository.findOneOrFail({ where: { id } });
      return next.handle();
    } catch (e) {
      console.error(e);
      throw new NotFoundException(`The reservation with id: ${id} not exist`);
    }
  }
}
