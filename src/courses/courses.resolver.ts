import { Resolver, Query, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { CoursesService } from './courses.service';
import { Course } from './entities/course.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(private readonly coursesService: CoursesService, private readonly usersService: UsersService) {}

  @Query(() => [Course], { name: 'courses' })
  findAll() {
    return this.coursesService.findAll();
  }

  @Query(() => Course, { name: 'course' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.coursesService.findOne(id);
  }

  @ResolveField(() => User, {name: "owner"})
  getCourseOwner(@Parent() parent: any) {
    console.log(parent)
    return this.usersService.findOne(1)
  }
}
