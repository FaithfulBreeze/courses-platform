import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { environments } from 'src/common/constants/environments';

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
  },
};
