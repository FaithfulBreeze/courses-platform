import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';
import { Lesson } from '../../../lessons/entities/lesson.entity';
import { User } from '../../../users/entities/user.entity';
import { DataSource } from 'typeorm';

export class FindLessonCompletedUsersQuery {
  constructor(public readonly lessonId: number) {}
}

@QueryHandler(FindLessonCompletedUsersQuery)
export class FindLessonCompletedUsersQueryHandler
  implements IQueryHandler<FindLessonCompletedUsersQuery, User[]>
{
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}
  async execute(query: FindLessonCompletedUsersQuery) {
    const lesson = await this.dataSource.manager.findOne(Lesson, {
      where: {
        id: query.lessonId,
      },
      relations: {
        completedBy: true,
      },
    });

    return lesson?.completedBy || [];
  }
}
