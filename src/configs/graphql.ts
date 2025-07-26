import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { environments } from '../common/constants/environments';

export const graphqlConfigs: Record<string, ApolloDriverConfig> = {
  [environments.DEVELOPMENT]: {
    driver: ApolloDriver,
    playground: true,
    autoSchemaFile: join(process.cwd(), './schema.gql'),
  },
  [environments.PRODUCTION]: {
    driver: ApolloDriver,
    typePaths: [join(process.cwd(), './schema.gql')],
    hideSchemaDetailsFromClientErrors: true,
    cache: 'bounded',
    csrfPrevention: true,
    debug: false,
  },
};
