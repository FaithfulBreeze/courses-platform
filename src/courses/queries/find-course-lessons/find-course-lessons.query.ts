import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';
import { Course } from '../../../courses/entities/course.entity';
import { Lesson } from '../../../lessons/entities/lesson.entity';
import { DataSource } from 'typeorm';

export class FindCourseLessons {
  constructor(public readonly courseId: number) {}
}

@QueryHandler(FindCourseLessons)
export class FindCourseLessonsHandler implements IQueryHandler<FindCourseLessons, Lesson[]> {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}
  async execute(query: FindCourseLessons) {
    const course = await this.dataSource.manager.findOne(Course, {
      where: {
        id: query.courseId,
      },
      relations: {
        lessons: true,
      },
    });

    return course?.lessons || [];
  }
}
