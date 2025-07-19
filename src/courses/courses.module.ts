import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesResolver } from './courses.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { CoursesController } from './courses.controller';
import { JwtService } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { Queries } from './queries';

@Module({
  imports: [TypeOrmModule.forFeature([Course]), UsersModule],
  providers: [CoursesResolver, CoursesService, JwtService, ...Queries],
  controllers: [CoursesController],
  exports: [TypeOrmModule, CoursesService],
})
export class CoursesModule {}
