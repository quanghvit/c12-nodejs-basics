require('dotenv').config();
import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { AppConstants } from '../const';

const port = AppConstants.pg.port;
const host = AppConstants.pg.host;
const database = AppConstants.pg.db;
const username = AppConstants.pg.user;
const password = AppConstants.pg.pass;

export const AppDataSource = new DataSource({
  host,
  port,
  username,
  password,
  database,
  type: 'postgres',
  synchronize: true,
  logging: false,
  logger: 'advanced-console',
  entities: ['src/entities/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/**/*{.ts,.js}'],
  subscribers: ['src/subscribers/**/*{.ts,.js}'],
});
