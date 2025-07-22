import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { User } from 'src/users/entities/user.entity';
import { DataSource } from 'typeorm';

export class FindLessonCompletedUsers {
  constructor(public readonly lessonId: number) {}
}

@QueryHandler(FindLessonCompletedUsers)
export class FindLessonCompletedUsersHandler
  implements IQueryHandler<FindLessonCompletedUsers, User[]>
{
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}
  async execute(query: FindLessonCompletedUsers) {
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
