import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';
import { Review } from 'src/reviews/entities/review.entity';
import { User } from 'src/users/entities/user.entity';
import { DataSource } from 'typeorm';

export class FindReviewOwner {
  constructor(public readonly reviewId: number) {}
}

@QueryHandler(FindReviewOwner)
export class FindReviewOwnerHandler implements IQueryHandler<FindReviewOwner, User | undefined> {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}
  async execute(query: FindReviewOwner) {
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
