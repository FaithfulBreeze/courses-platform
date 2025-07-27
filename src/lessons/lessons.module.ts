import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsResolver } from './lessons.resolver';
import { LessonsController } from './lessons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { VercelCdnService } from '../vercel-cdn/vercel-cdn.service';
import { JwtService } from '@nestjs/jwt';
import { CoursesService } from '../courses/courses.service';
import { Course } from '../courses/entities/course.entity';
import { NodemailerService } from '../nodemailer/nodemailer.service';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { BullModule } from '@nestjs/bullmq';
import { Handlers } from './events';
import { Processors } from './processors';
import { Queries } from './queries';
import { FfmpegService } from '../ffmpeg/ffmpeg.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lesson, Course, User]),
    BullModule.registerQueue({ name: 'upload-video' }, { name: 'upload-image' }),
  ],
  providers: [
    LessonsResolver,
    LessonsService,
    CoursesService,
    VercelCdnService,
    JwtService,
    NodemailerService,
    UsersService,
    BcryptService,
    FfmpegService,
    ...Processors,
    ...Handlers,
    ...Queries,
  ],
  controllers: [LessonsController],
})
export class LessonsModule {}
