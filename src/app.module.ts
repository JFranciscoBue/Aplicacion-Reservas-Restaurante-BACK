import { Module } from '@nestjs/common';
import { ReservationsModule } from './reservations/reservations.module';
import { AdminsModule } from './admins/admins.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './config/typeorm';
import { config as envConfig } from 'dotenv';
import { JwtModule } from '@nestjs/jwt';
import { ClientContactsModule } from './clientContacts/clientContacts.module';

envConfig({ path: '.env' });

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('typeorm'),
    }),
    ReservationsModule,
    AdminsModule,
    ClientContactsModule,
    AuthModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: 82400 },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
