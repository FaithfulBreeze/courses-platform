import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';
import { Course } from '../../../courses/entities/course.entity';
import { Lesson } from '../../../lessons/entities/lesson.entity';
import { DataSource } from 'typeorm';

export class FindLessonCourseQuery {
  constructor(public readonly lessonId: number) {}
}

@QueryHandler(FindLessonCourseQuery)
export class FindLessonCourseQueryHandler
  implements IQueryHandler<FindLessonCourseQuery, Course | undefined>
{
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}
  async execute(query: FindLessonCourseQuery) {
    const lesson = await this.dataSource.manager.findOne(Lesson, {
      where: {
        id: query.lessonId,
      },
      relations: {
        course: true,
      },
    });

    return lesson?.course;
  }
}
