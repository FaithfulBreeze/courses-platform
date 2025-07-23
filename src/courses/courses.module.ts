import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesResolver } from './courses.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { CoursesController } from './courses.controller';
import { JwtService } from '@nestjs/jwt';
import { Queries } from './queries';
import { BcryptService } from '../bcrypt/bcrypt.service';

@Module({
  imports: [TypeOrmModule.forFeature([Course])],
  providers: [CoursesResolver, CoursesService, JwtService, BcryptService, ...Queries],
  controllers: [CoursesController],
  exports: [TypeOrmModule, CoursesService],
})
export class CoursesModule {}
