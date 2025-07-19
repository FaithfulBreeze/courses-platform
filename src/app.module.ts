import { Module, OnModuleInit } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CoursesModule } from './courses/courses.module';
import { ReviewsModule } from './reviews/reviews.module';
import { UsersModule } from './users/users.module';
import { InjectDataSource, TypeOrmModule } from '@nestjs/typeorm';
import { LessonsModule } from './lessons/lessons.module';
import { VercelCdnService } from './vercel-cdn/vercel-cdn.service';
import { ConfigModule } from '@nestjs/config';
import { NodemailerService } from './nodemailer/nodemailer.service';
import { AuthModule } from './auth/auth.module';
import { BcryptService } from './bcrypt/bcrypt.service';
import { BullModule } from '@nestjs/bullmq';
import { join } from 'path';
import { seed } from 'test/seed';
import { DataSource } from 'typeorm';
import { environments } from './common/constants/environments';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), './schema.gql'),
      hideSchemaDetailsFromClientErrors: true,
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      autoLoadEntities: true,
      synchronize: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), '.env'),
    }),
    BullModule.forRoot({
      connection: {
        host: process.env.BULL_REDIS_HOST,
        port: parseInt(process.env.BULL_REDIS_PORT!),
        username: process.env.BULL_REDIS_USERNAME,
        password: process.env.BULL_REDIS_PASSWORD,
      },
      defaultJobOptions: {
        attempts: 1,
        removeOnFail: true,
      },
    }),
    CoursesModule,
    ReviewsModule,
    UsersModule,
    LessonsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [VercelCdnService, NodemailerService, BcryptService],
})
export class AppModule implements OnModuleInit {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}
  onModuleInit() {
    if (process.env.NODE_ENV === environments.DEVELOPMENT) seed(this.dataSource);
  }
}
