require('dotenv').config();
import 'reflect-metadata';
import { DataSource } from 'typeorm';

const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432;
const host = process.env.DB_HOST || 'localhost';
const database = process.env.DB_NAME || 'postgres';
const username = process.env.DB_USER || 'postgres';
const password = process.env.DB_PASS || '123456';

export const AppDataSource = new DataSource({
  host,
  port,
  username,
  password,
  database,
  type: 'postgres',
  synchronize: true,
  logging: true,
  logger: 'advanced-console',
  entities: ['src/entities/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/**/*{.ts,.js}'],
  subscribers: ['src/subscribers/**/*{.ts,.js}'],
});
