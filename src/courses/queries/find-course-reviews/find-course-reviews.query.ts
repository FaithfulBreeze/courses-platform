import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';
import { Review } from '../../../reviews/entities/review.entity';
import { DataSource } from 'typeorm';

export class FindCourseReviewsQuery {
  constructor(
    public readonly courseId: number,
    public readonly page?: number,
    public readonly limit?: number,
  ) {}
}

@QueryHandler(FindCourseReviewsQuery)
export class FindCourseReviewsQueryHandler implements IQueryHandler<FindCourseReviewsQuery, Review[]> {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}
  async execute(query: FindCourseReviewsQuery) {
    const reviews = await this.dataSource.manager.find(Review, {
      where: { course: { id: query.courseId } },
      relations: {
        course: true,
      },
      skip: query.page ? (query.page - 1) * (query.limit || 10) : undefined,
      take: query.limit || 10,
    });

    return reviews;
  }
}
