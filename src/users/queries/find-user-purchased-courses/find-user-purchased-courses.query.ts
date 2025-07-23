import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';
import { Course } from '../../../courses/entities/course.entity';
import { User } from '../../../users/entities/user.entity';
import { DataSource } from 'typeorm';

export class FindUserPurchasedCoursesQuery {
  constructor(public readonly userId: number) {}
}

@QueryHandler(FindUserPurchasedCoursesQuery)
export class FindUserPurchasedCoursesQueryHandler
  implements IQueryHandler<FindUserPurchasedCoursesQuery, Course[]>
{
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}
  async execute(query: FindUserPurchasedCoursesQuery): Promise<Course[]> {
    const user = await this.dataSource.manager.findOne(User, {
      where: {
        id: query.userId,
      },
      relations: {
        purchasedCourses: true,
      },
    });

    if (!user) return [];

    return user.purchasedCourses;
  }
}
