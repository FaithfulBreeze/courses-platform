import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';
import { Review } from '../../../reviews/entities/review.entity';
import { DataSource } from 'typeorm';

export class FindLessonReviewsCountQuery {
  constructor(
    public readonly lessonId: number,
    public readonly page?: number,
    public readonly limit?: number,
  ) {}
}

@QueryHandler(FindLessonReviewsCountQuery)
export class FindLessonReviewsCountQueryHandler
  implements IQueryHandler<FindLessonReviewsCountQuery, number>
{
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}
  async execute(query: FindLessonReviewsCountQuery) {
    return await this.dataSource.manager.count(Review, {
      where: { lesson: { id: query.lessonId } },
      relations: {
        lesson: true,
      },
      skip: query.page ? (query.page - 1) * (query.limit || 10) : undefined,
      take: query.limit || 10,
    });
  }
}
