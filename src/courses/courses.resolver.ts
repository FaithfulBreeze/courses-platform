import { Resolver, Query, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { CoursesService } from './courses.service';
import { Course } from './entities/course.entity';
import { User } from '../users/entities/user.entity';
import { Lesson } from '../lessons/entities/lesson.entity';
import { Review } from '../reviews/entities/review.entity';
import { CoursePurchase } from './entities/course-purchase.entity';

@Resolver(() => Course)
export class CoursesResolver {
  constructor(private readonly coursesService: CoursesService) {}

  @Query(() => [Course], { name: 'courses' })
  findAll() {
    return this.coursesService.findAll();
  }

  @Query(() => Course, { name: 'course' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.coursesService.findOne(id);
  }

  @ResolveField(() => User, { name: 'owner' })
  findCourseOwner(@Parent() parent: Course) {
    return this.coursesService.findCourseOwner(parent.id);
  }

  @ResolveField(() => [User], { name: 'students' })
  findCourseStudents(@Parent() parent: Course) {
    return this.coursesService.findCourseStudents(parent.id);
  }

  @ResolveField(() => [Lesson], { name: 'lessons' })
  findCourseLessons(
    @Parent() parent: Course,
    @Args('page', { type: () => Int, nullable: true }) page?: number,
    @Args('limit', { type: () => Int, nullable: true }) limit?: number,
  ) {
    return this.coursesService.findCourseLessons(parent.id, page, limit);
  }

  @ResolveField(() => [Review], { name: 'reviews' })
  findCourseReviews(@Parent() parent: Course) {
    return this.coursesService.findCourseReviews(parent.id);
  }
}

@Resolver(() => CoursePurchase)
export class CoursePurchasesResolver {
  constructor(private readonly coursesService: CoursesService) {}

  @ResolveField(() => Course, { name: 'course' })
  findPurchasedCourse(@Parent() parent: CoursePurchase) {
    return this.coursesService.findPurchasedCourse(parent.id);
  }
}
