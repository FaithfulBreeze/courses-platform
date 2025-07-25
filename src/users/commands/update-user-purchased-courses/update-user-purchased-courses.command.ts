import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PurchaseCourseDto } from '../../../courses/dto/purchase-course.dto';
import { Course } from '../../../courses/entities/course.entity';
import { User } from '../../../users/entities/user.entity';
import { EntityManager } from 'typeorm';

export class UpdateUserPurchasedCoursesCommand {
  constructor(
    public readonly purchaseCourseDto: PurchaseCourseDto,
    public readonly manager: EntityManager,
  ) {}
}

@CommandHandler(UpdateUserPurchasedCoursesCommand)
export class UpdateUserPurchasedCoursesCommandHandler
  implements ICommandHandler<UpdateUserPurchasedCoursesCommand, void>
{
  async execute(command: UpdateUserPurchasedCoursesCommand): Promise<void> {
    const user = await command.manager.findOne(User, {
      where: {
        id: command.purchaseCourseDto.userId,
      },
      relations: {
        purchasedCourses: true,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    const course = await command.manager.findOne(Course, {
      where: {
        id: command.purchaseCourseDto.courseId,
      },
      relations: {
        students: true,
      },
    });

    if (!course) throw new NotFoundException('Course not found');

    course.students.push(user);
    user.purchasedCourses.push(course);

    await command.manager.save([user]);
  }
}
