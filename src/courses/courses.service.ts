import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryBus } from '@nestjs/cqrs';
import { FindCourseOwner } from './queries/find-course-owner/find-course-owner.query';
import { FindCourseStudents } from './queries/find-course-students/find-course-students.query';
import { FindCourseLessons } from './queries/find-course-lessons/find-course-lessons.query';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>,
    private readonly queryBus: QueryBus,
  ) {}

  create(createCourseDto: CreateCourseDto, userId: number) {
    const createdCourse = this.coursesRepository.create({
      ...createCourseDto,
      owner: { id: userId },
    });

    return this.coursesRepository.save(createdCourse);
  }

  findAll() {
    return this.coursesRepository.find();
  }

  findOne(id: number) {
    return this.coursesRepository.findOne({ where: { id } });
  }

  findCourseOwner(id: number) {
    return this.queryBus.execute(new FindCourseOwner(id));
  }

  findCourseStudents(id: number) {
    return this.queryBus.execute(new FindCourseStudents(id));
  }

  findCourseLessons(id: number) {
    return this.queryBus.execute(new FindCourseLessons(id));
  }
}
