import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';
import { Lesson } from '../../../lessons/entities/lesson.entity';
import { DataSource } from 'typeorm';

export class FindCourseLessonsCount {
  constructor(
    public readonly courseId: number,
    public readonly page?: number,
    public readonly limit?: number,
  ) {}
}

@QueryHandler(FindCourseLessonsCount)
export class FindCourseLessonsCountHandler
  implements IQueryHandler<FindCourseLessonsCount, number>
{
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}
  async execute(query: FindCourseLessonsCount) {
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
