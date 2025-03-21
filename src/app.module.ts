import { Module } from '@nestjs/common';
import { ReservationsModule } from './reservations/reservations.module';
import { AdminsModule } from './admins/admins.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ReservationsModule, AdminsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
