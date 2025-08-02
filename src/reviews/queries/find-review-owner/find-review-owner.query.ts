import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';
import { Review } from '../../../reviews/entities/review.entity';
import { User } from '../../../users/entities/user.entity';
import { DataSource } from 'typeorm';

export class FindReviewOwnerQuery {
  constructor(public readonly reviewId: number) {}
}

@QueryHandler(FindReviewOwnerQuery)
export class FindReviewOwnerQueryHandler implements IQueryHandler<FindReviewOwnerQuery, User | undefined> {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}
  async execute(query: FindReviewOwnerQuery) {
    const review = await this.dataSource.manager.findOne(Review, {
      where: {
        id: query.reviewId,
      },
      relations: {
        reviewer: true,
      },
    });

    return review?.reviewer;
  }
}
