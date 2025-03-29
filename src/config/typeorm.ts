import { DataSource, DataSourceOptions } from 'typeorm';
import { config as envConfig } from 'dotenv';
import { registerAs } from '@nestjs/config';

envConfig({ path: '.env' });

const config = {
  type: process.env.BBDD_TYPE,
  database: process.env.BBDD,
  host: process.env.BBDD_HOST,
  port: Number(process.env.BBDD_PORT),
  username: process.env.BBDD_USER,
  password: process.env.BBDD_PASSWORD,
  autoLoadEntities: true,
  entities: ['/dist/**/*.entity.{ts,js}'],
  logging: false,
  synchronize: true,
  // dropSchema: true,
};
export default registerAs('typeorm', () => config);

export const connection = new DataSource(
  config as unknown as DataSourceOptions,
);
