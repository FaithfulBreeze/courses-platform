import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';
import { Lesson } from '../../../lessons/entities/lesson.entity';
import { DataSource } from 'typeorm';

export class FindCourseLessonsCountQuery {
  constructor(
    public readonly courseId: number,
    public readonly page?: number,
    public readonly limit?: number,
  ) {}
}

@QueryHandler(FindCourseLessonsCountQuery)
export class FindCourseLessonsCountQueryHandler
  implements IQueryHandler<FindCourseLessonsCountQuery, number>
{
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}
  async execute(query: FindCourseLessonsCountQuery) {
    const lessonsCount = await this.dataSource.manager.count(Lesson, {
      where: {
        course: {
          id: query.courseId,
        },
      },
    });

    return lessonsCount;
  }
}
