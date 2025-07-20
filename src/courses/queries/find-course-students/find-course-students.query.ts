import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';
import { Course } from 'src/courses/entities/course.entity';
import { User } from 'src/users/entities/user.entity';
import { DataSource } from 'typeorm';

export class FindCourseStudents {
  constructor(public readonly courseId: number) {}
}

@QueryHandler(FindCourseStudents)
export class FindCourseStudentsHandler implements IQueryHandler<FindCourseStudents, User[]> {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}
  async execute(query: FindCourseStudents) {
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
