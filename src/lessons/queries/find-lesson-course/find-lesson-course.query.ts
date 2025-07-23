import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';
import { Course } from '../../../courses/entities/course.entity';
import { Lesson } from '../../../lessons/entities/lesson.entity';
import { DataSource } from 'typeorm';

export class FindLessonCourse {
  constructor(public readonly lessonId: number) {}
}

@QueryHandler(FindLessonCourse)
export class FindLessonCourseHandler
  implements IQueryHandler<FindLessonCourse, Course | undefined>
{
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}
  async execute(query: FindLessonCourse) {
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
