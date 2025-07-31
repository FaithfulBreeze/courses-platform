import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';
import { Lesson } from '../../../lessons/entities/lesson.entity';
import { User } from '../../../users/entities/user.entity';
import { DataSource } from 'typeorm';

export class FindUserCompletedLessonsQuery {
  constructor(public readonly userId: number) {}
}

@QueryHandler(FindUserCompletedLessonsQuery)
export class FindUserCompletedLessonsQueryHandler
  implements IQueryHandler<FindUserCompletedLessonsQuery, Lesson[]>
{
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}
  async execute(query: FindUserCompletedLessonsQuery) {
    const user = await this.dataSource.manager.findOne(User, {
      where: {
        id: query.userId,
      },
      relations: {
        completedLessons: true,
      },
    });

    return user?.completedLessons || [];
  }
}
