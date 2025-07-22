import { Resolver, Query, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { LessonsService } from './lessons.service';
import { Lesson } from './entities/lesson.entity';
import { User } from 'src/users/entities/user.entity';
import { Course } from 'src/courses/entities/course.entity';

@Resolver(() => Lesson)
export class LessonsResolver {
  constructor(private readonly lessonsService: LessonsService) {}

  @Query(() => [Lesson], { name: 'lessons' })
  findAll() {
    return this.lessonsService.findAll();
  }

  @Query(() => Lesson, { name: 'lesson' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.lessonsService.findOne(id);
  }

  @ResolveField(() => Course, { name: 'course' })
  findLessonCourse(@Parent() parent: Lesson) {
    return this.lessonsService.findLessonCourse(parent.id);
  }

  @ResolveField(() => [User], { name: 'completedBy' })
  findLessonCompletedUsers(@Parent() parent: Lesson) {
    return this.lessonsService.findLessonCompletedUsers(parent.id);
  }
}
