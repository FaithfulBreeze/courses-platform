import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';
import { Lesson } from '../../../lessons/entities/lesson.entity';
import { DataSource } from 'typeorm';

export class FindCourseLessonsQuery {
  constructor(
    public readonly courseId: number,
    public readonly page?: number,
    public readonly limit?: number,
  ) {}
}

@QueryHandler(FindCourseLessonsQuery)
export class FindCourseLessonsQueryHandler implements IQueryHandler<FindCourseLessonsQuery, Lesson[]> {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}
  async execute(query: FindCourseLessonsQuery) {
    const lessons = await this.dataSource.manager.find(Lesson, {
      where: {
        course: {
          id: query.courseId,
        },
      },
      relations: {
        course: true,
      },
      order: {
        order: 'ASC',
      },
      take: query.limit || 10,
      skip: query.page ? (query.page - 1) * (query.limit || 10) : 0,
    });

    return lessons;
  }
}
