import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesResolver } from './courses.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { CoursesController } from './courses.controller';
import { JwtService } from '@nestjs/jwt';
import { Queries } from './queries';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { Commands } from './commands';
import { Handlers } from './events';
import { NodemailerService } from '../nodemailer/nodemailer.service';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, User])],
  providers: [
    CoursesResolver,
    CoursesService,
    JwtService,
    BcryptService,
    NodemailerService,
    ...Queries,
    ...Commands,
    ...Handlers,
  ],
  controllers: [CoursesController],
  exports: [TypeOrmModule, CoursesService],
})
export class CoursesModule {}
