import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';
import { User } from '../../../users/entities/user.entity';
import { DataSource } from 'typeorm';

export class FindCourseOwnerQuery {
  constructor(public readonly courseId: number) {}
}

@QueryHandler(FindCourseOwnerQuery)
export class FindCourseOwnerQueryHandler implements IQueryHandler<FindCourseOwnerQuery, User | null> {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}
  execute(query: FindCourseOwnerQuery) {
    return this.dataSource.manager.findOne(User, {
      where: {
        createdCourses: {
          id: query.courseId,
        },
      },
      relations: {
        createdCourses: true,
      },
    });
  }
}
