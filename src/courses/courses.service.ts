import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { FindCourseOwner } from './queries/find-course-owner/find-course-owner.query';
import { FindCourseStudents } from './queries/find-course-students/find-course-students.query';
import { FindCourseLessons } from './queries/find-course-lessons/find-course-lessons.query';
import { FindCourseReviews } from './queries/find-course-reviews/find-course-reviews.query';
import { PurchaseCourseDto } from './dto/purchase-course.dto';
import { RegisterCoursePurchaseCommand } from './commands/register-course-purchase/register-course-purchase.command';
import { UpdateUserPurchasedCoursesCommand } from '../users/commands/update-user-purchased-courses/update-user-purchased-courses.command';
import { CoursePurchasedEvent } from './events/course-purchased/course-purchased.event';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
    private readonly eventBus: EventBus,
  ) {}

  create(createCourseDto: CreateCourseDto, userId: number) {
    const createdCourse = this.coursesRepository.create({
      ...createCourseDto,
      owner: { id: userId },
    });

    return this.coursesRepository.save(createdCourse);
  }

  async purchase(purchaseCourseDto: PurchaseCourseDto) {
    const coursePurchase = await this.coursesRepository.manager.transaction(async (manager) => {
      const coursePurchase = await this.commandBus.execute(
        new RegisterCoursePurchaseCommand(purchaseCourseDto, manager),
      );
      await this.commandBus.execute(
        new UpdateUserPurchasedCoursesCommand(purchaseCourseDto, manager),
      );

      return coursePurchase;
    });

    if (coursePurchase) this.eventBus.publish(new CoursePurchasedEvent(purchaseCourseDto));

    return coursePurchase;
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

  findPurchasedCourse(purchasedCourseId: number) {
    return this.coursesRepository.findOne({
      where: {
        coursePurchases: {
          id: purchasedCourseId,
        },
      },
      relations: {
        coursePurchases: true,
      },
    });
  }

  findCourseLessons(id: number) {
    return this.queryBus.execute(new FindCourseLessons(id));
  }

  findCourseReviews(id: number) {
    return this.queryBus.execute(new FindCourseReviews(id));
  }
}
