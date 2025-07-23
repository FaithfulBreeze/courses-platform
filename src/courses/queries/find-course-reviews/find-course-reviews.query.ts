import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';
import { Course } from '../../../courses/entities/course.entity';
import { Review } from '../../../reviews/entities/review.entity';
import { DataSource } from 'typeorm';

export class FindCourseReviews {
  constructor(public readonly courseId: number) {}
}

@QueryHandler(FindCourseReviews)
export class FindCourseReviewsHandler implements IQueryHandler<FindCourseReviews, Review[]> {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}
  async execute(query: FindCourseReviews) {
    const course = await this.dataSource.manager.findOne(Course, {
      where: {
        id: query.courseId,
      },
      relations: {
        reviews: true,
      },
    });

    return course?.reviews || [];
  }
}
