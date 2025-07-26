import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Course } from '../courses/entities/course.entity';
import { Lesson } from '../lessons/entities/lesson.entity';
import { CoursePurchase } from '../courses/entities/course-purchase.entity';

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

  @ResolveField(() => [CoursePurchase], { name: 'lastCoursePurchases' })
  findUserLastCoursePurchases(
    @Parent() parent: User,
    @Args('limit', { type: () => Int }) limit: number,
  ) {
    return this.usersService.findUserLastCoursePurchases(parent.id, limit);
  }

  @ResolveField(() => Lesson, { name: 'lastWatchedLesson' })
  findUserLasWatchedLesson(@Parent() parent: User) {
    return this.usersService.findUserLastWatchedLesson(parent.id);
  }
}
