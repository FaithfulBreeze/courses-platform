import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { User } from 'src/users/entities/user.entity';
import { DataSource } from 'typeorm';

export class FindUserCompletedLessons {
  constructor(public readonly userId: number) {}
}

@QueryHandler(FindUserCompletedLessons)
export class FindUserCompletedLessonsHandler
  implements IQueryHandler<FindUserCompletedLessons, Lesson[]>
{
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}
  async execute(query: FindUserCompletedLessons) {
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
