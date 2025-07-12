import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsResolver } from './lessons.resolver';
import { LessonsController } from './lessons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { VercelCdnService } from 'src/vercel-cdn/vercel-cdn.service';
import { JwtService } from '@nestjs/jwt';
import { CoursesService } from 'src/courses/courses.service';
import { Course } from 'src/courses/entities/course.entity';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { BullModule } from '@nestjs/bullmq';
import { Handlers } from './events';
import { Processors } from './processors';
import { CqrsModule, EventBus } from '@nestjs/cqrs';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lesson, Course, User]),
    BullModule.registerQueue({ name: 'create-lesson' }),
    CqrsModule.forRoot(),
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
    EventBus,
    ...Processors,
    ...Handlers,
  ],
  controllers: [LessonsController],
})
export class LessonsModule {}
