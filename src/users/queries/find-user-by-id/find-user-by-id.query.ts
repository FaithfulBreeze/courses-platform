import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectDataSource } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { DataSource } from 'typeorm';

export class FindUserByIdQuery {
  constructor(public readonly userId: number) {}
}

@QueryHandler(FindUserByIdQuery)
export class FindUserByIdQueryHandler
  implements IQueryHandler<FindUserByIdQuery, User | null>
{
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}
  execute(query: FindUserByIdQuery) {
    return this.dataSource.manager.findOne(User, {
      where: {
        id: query.userId,
      },
    });
  }
}
