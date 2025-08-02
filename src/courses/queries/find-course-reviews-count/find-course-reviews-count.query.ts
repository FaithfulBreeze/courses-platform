import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';
import { Review } from '../../../reviews/entities/review.entity';
import { DataSource } from 'typeorm';

export class FindCourseReviewsCountQuery {
  constructor(public readonly courseId: number) {}
}
@QueryHandler(FindCourseReviewsCountQuery)
export class FindCourseReviewsCountQueryHandler
  implements IQueryHandler<FindCourseReviewsCountQuery, number>
{
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}
  execute(query: FindCourseReviewsCountQuery) {
    return this.dataSource.manager.count(Review, {
      where: { course: { id: query.courseId } },
      relations: {
        course: true,
      },
    });
  }
}
