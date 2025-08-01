import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';
import { Review } from '../../../reviews/entities/review.entity';
import { DataSource } from 'typeorm';

export class FindCourseReviews {
  constructor(
    public readonly courseId: number,
    public readonly page?: number,
    public readonly limit?: number,
  ) {}
}

@QueryHandler(FindCourseReviews)
export class FindCourseReviewsHandler implements IQueryHandler<FindCourseReviews, Review[]> {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}
  async execute(query: FindCourseReviews) {
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
