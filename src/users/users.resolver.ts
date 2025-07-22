import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Course } from 'src/courses/entities/course.entity';
import { Lesson } from 'src/lessons/entities/lesson.entity';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.findOne(id);
  }

  @ResolveField(() => [Course], { name: 'purchasedCourses' })
  findUserPurchasedCourses(@Parent() parent: User) {
    return this.usersService.findUserPurchasedCourses(parent.id);
  }

  @ResolveField(() => [Lesson], { name: 'completedLessons' })
  findUserCompletedLessons(@Parent() parent: User) {
    return this.usersService.findUserCompletedLessons(parent.id);
  }
}
