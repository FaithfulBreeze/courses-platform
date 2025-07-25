import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { environments } from '../common/constants/environments';
import 'dotenv/config';

export const typeormConfigs: Record<string, TypeOrmModuleOptions> = {
  [environments.DEVELOPMENT]: {
    type: 'sqlite',
    database: ':memory:',
    autoLoadEntities: true,
    entities: [`${process.cwd()}/**/*.entity.js`],
    synchronize: true,
  },
  [environments.PRODUCTION]: {
    type: 'postgres',
    url: process.env.DATABASE_URL || '',
    autoLoadEntities: true,
    entities: [`${process.cwd()}/**/*.entity.js`],
    ssl: { rejectUnauthorized: false },
  },
};
