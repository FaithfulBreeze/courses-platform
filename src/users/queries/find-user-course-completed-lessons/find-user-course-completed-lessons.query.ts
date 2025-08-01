import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { DataSource } from 'typeorm';

export class FindUserCourseCompletedLessonsQuery {
  constructor(
    public readonly userId: number,
    public readonly courseId: number,
  ) {}
}

@QueryHandler(FindUserCourseCompletedLessonsQuery)
export class FindUserCourseCompletedLessonsQueryHandler
  implements IQueryHandler<FindUserCourseCompletedLessonsQuery, Lesson[]>
{
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async execute(query: FindUserCourseCompletedLessonsQuery): Promise<Lesson[]> {
    const { userId, courseId } = query;

    return this.dataSource.manager.find(Lesson, {
      where: {
        course: {
          id: courseId,
        },
        completedBy: {
          id: userId,
        },
      },
      relations: {
        course: true,
        completedBy: true,
      },
      order: {
        order: 'ASC',
      },
    });
  }
}
