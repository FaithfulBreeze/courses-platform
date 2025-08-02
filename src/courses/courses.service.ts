import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { RegisterCoursePurchaseCommand } from './commands/register-course-purchase/register-course-purchase.command';
import { UpdateUserPurchasedCoursesCommand } from '../users/commands/update-user-purchased-courses/update-user-purchased-courses.command';
import { CoursePurchasedEvent } from './events/course-purchased/course-purchased.event';
import { FindCourseReviewsCountQuery } from './queries/find-course-reviews-count/find-course-reviews-count.query';
import { FindCourseStudentsQuery } from './queries/find-course-students/find-course-students.query';
import { FindCourseOwnerQuery } from './queries/find-course-owner/find-course-owner.query';
import { FindCourseLessonsQuery } from './queries/find-course-lessons/find-course-lessons.query';
import { FindCourseLessonsCountQuery } from './queries/find-course-lessons-count/find-course-lessons-count.query';
import { FindCourseReviewsQuery } from './queries/find-course-reviews/find-course-reviews.query';

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

  async purchase(courseId: number, userId: number) {
    const coursePurchase = await this.coursesRepository.manager.transaction(async (manager) => {
      const coursePurchase = await this.commandBus.execute(
        new RegisterCoursePurchaseCommand(courseId, userId, manager),
      );
      await this.commandBus.execute(
        new UpdateUserPurchasedCoursesCommand(courseId, userId, manager),
      );

      return coursePurchase;
    });

    if (coursePurchase) this.eventBus.publish(new CoursePurchasedEvent(courseId, userId));

    return coursePurchase;
  }

  findAll() {
    return this.coursesRepository.find();
  }

  findOne(id: number) {
    return this.coursesRepository.findOne({ where: { id } });
  }

  findCourseOwner(id: number) {
    return this.queryBus.execute(new FindCourseOwnerQuery(id));
  }

  findCourseStudents(id: number) {
    return this.queryBus.execute(new FindCourseStudentsQuery(id));
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

  findCourseLessons(id: number, page?: number, limit?: number) {
    return this.queryBus.execute(new FindCourseLessonsQuery(id, page, limit));
  }

  findCourseLessonsCount(id: number) {
    return this.queryBus.execute(new FindCourseLessonsCountQuery(id));
  }

  findCourseReviews(id: number, page?: number, limit?: number) {
    return this.queryBus.execute(new FindCourseReviewsQuery(id, page, limit));
  }

  findCourseReviewsCount(id: number) {
    return this.queryBus.execute(new FindCourseReviewsCountQuery(id));
  }
}
