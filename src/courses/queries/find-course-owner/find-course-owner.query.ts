import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { DataSource, In } from 'typeorm';

export class FindCourseOwner {
  constructor(public readonly courseId: number) {}
}

@QueryHandler(FindCourseOwner)
export class FindCourseOwnerHandler implements IQueryHandler<FindCourseOwner, User | null> {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}
  execute(query: FindCourseOwner) {
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
