import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';
import { Review } from '../../../reviews/entities/review.entity';
import { DataSource } from 'typeorm';

export class FindLessonReviewsQuery {
  constructor(
    public readonly lessonId: number,
    public readonly page?: number,
    public readonly limit?: number,
  ) {}
}

@QueryHandler(FindLessonReviewsQuery)
export class FindLessonReviewsQueryHandler implements IQueryHandler<FindLessonReviewsQuery, Review[]> {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}
  async execute(query: FindLessonReviewsQuery) {
    const reviews = await this.dataSource.manager.find(Review, {
      where: { lesson: { id: query.lessonId } },
      relations: {
        lesson: true,
      },
      skip: query.page ? (query.page - 1) * (query.limit || 10) : undefined,
      take: query.limit || 10,
    });

    return reviews;
  }
}
