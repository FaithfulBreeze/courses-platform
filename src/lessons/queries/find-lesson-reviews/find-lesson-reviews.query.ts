import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';
import { Review } from '../../../reviews/entities/review.entity';
import { DataSource } from 'typeorm';
import { Lesson } from '../../../lessons/entities/lesson.entity';

export class FindLessonReviews {
  constructor(public readonly lessonId: number) {}
}

@QueryHandler(FindLessonReviews)
export class FindLessonReviewsHandler implements IQueryHandler<FindLessonReviews, Review[]> {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}
  async execute(query: FindLessonReviews) {
    const lesson = await this.dataSource.manager.findOne(Lesson, {
      where: {
        id: query.lessonId,
      },
      relations: {
        reviews: true,
      },
    });

    return lesson?.reviews || [];
  }
}
