import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';
import { Course } from '../../../courses/entities/course.entity';
import { User } from '../../../users/entities/user.entity';
import { DataSource } from 'typeorm';

export class FindCourseStudentsQuery {
  constructor(public readonly courseId: number) {}
}

@QueryHandler(FindCourseStudentsQuery)
export class FindCourseStudentsQueryHandler implements IQueryHandler<FindCourseStudentsQuery, User[]> {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}
  async execute(query: FindCourseStudentsQuery) {
    const course = await this.dataSource.manager.findOne(Course, {
      where: {
        id: query.courseId,
      },
      relations: {
        students: true,
      },
    });

    return course?.students || [];
  }
}
