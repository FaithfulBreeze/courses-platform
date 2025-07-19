import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseInput } from './dto/update-course.input';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryBus } from '@nestjs/cqrs';
import { FindCourseOwner } from './queries/find-course-owner/find-course-owner.query';

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

  findUserPurchasedCourses(id: number) {
    return this.coursesRepository.find({
      relations: { students: true },
      where: {
        students: {
          id,
        },
      },
    });
  }

  update(id: number, updateCourseInput: UpdateCourseInput) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }

  async getOwnerEmail(id: number) {
    return (
      await this.coursesRepository.findOne({
        where: { id },
        relations: {
          owner: true,
        },
        select: {
          owner: {
            email: true,
          },
        },
      })
    )?.owner.email;
  }
}
