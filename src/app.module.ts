import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { CoursesModule } from './courses/courses.module';
import { ReviewsModule } from './reviews/reviews.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LessonsModule } from './lessons/lessons.module';
import { VercelCdnService } from './vercel-cdn/vercel-cdn.service';
import { ConfigModule } from '@nestjs/config';
import { NodemailerService } from './nodemailer/nodemailer.service';
import { AuthModule } from './auth/auth.module';
import { BcryptService } from './bcrypt/bcrypt.service';
import { BullModule } from '@nestjs/bullmq';
import { join } from 'path';
import { environments } from './common/constants/environments';
import { typeormConfigs } from './configs/typeorm';
import { graphqlConfigs } from './configs/graphql';
import { bullmqConfigs } from './configs/bullmq';
import { FfmpegService } from './ffmpeg/ffmpeg.service';
import 'dotenv/config';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>(
      graphqlConfigs[process.env.NODE_ENV || environments.DEVELOPMENT],
    ),
    TypeOrmModule.forRoot(typeormConfigs[process.env.NODE_ENV || environments.DEVELOPMENT]),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), '.env'),
    }),
    BullModule.forRoot(bullmqConfigs[process.env.NODE_ENV || environments.DEVELOPMENT]),
    CoursesModule,
    ReviewsModule,
    UsersModule,
    LessonsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [VercelCdnService, NodemailerService, BcryptService, FfmpegService],
})
export class AppModule {}
