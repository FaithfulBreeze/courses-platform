import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { environments } from 'src/common/constants/environments';
import 'dotenv/config';

export const typeormConfigs: Record<string, TypeOrmModuleOptions> = {
  [environments.DEVELOPMENT]: {
    type: 'sqlite',
    database: ':memory:',
    autoLoadEntities: true,
    synchronize: true,
  },
  [environments.PRODUCTION]: {
    type: 'postgres',
    url: process.env.DATABASE_URL || '',
    autoLoadEntities: true,
    ssl: { rejectUnauthorized: false },
  },
};
