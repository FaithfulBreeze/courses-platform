import { BullRootModuleOptions } from '@nestjs/bullmq';
import { environments } from '../common/constants/environments';
import 'dotenv/config';

export const bullmqConfigs: Record<string, BullRootModuleOptions> = {
  [environments.DEVELOPMENT]: {
    connection: {
      url: 'redis://default:redispw@localhost:6379',
    },
    defaultJobOptions: {
      attempts: 1,
      backoff: 2,
      removeOnFail: true,
    },
  },
  [environments.PRODUCTION]: {
    connection: {
      url: process.env.BULL_REDIS_URL,
    },
    defaultJobOptions: {
      attempts: 1,
      backoff: 2,
      removeOnFail: true,
    },
  },
};
