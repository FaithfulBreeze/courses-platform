import { ConflictException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PurchaseCourseDto } from '../../../courses/dto/purchase-course.dto';
import { CoursePurchase } from '../../../courses/entities/course-purchase.entity';
import { Course } from '../../../courses/entities/course.entity';
import { User } from '../../../users/entities/user.entity';
import { EntityManager } from 'typeorm';

export class RegisterCoursePurchaseCommand {
  constructor(
    public readonly purchaseCourseDto: PurchaseCourseDto,
    public readonly manager: EntityManager,
  ) {}
}

@CommandHandler(RegisterCoursePurchaseCommand)
export class RegisterCoursePurchaseCommandHandler
  implements ICommandHandler<RegisterCoursePurchaseCommand, CoursePurchase>
{
  async execute(command: RegisterCoursePurchaseCommand): Promise<CoursePurchase> {
    const user = await command.manager.findOne(User, {
      where: {
        id: command.purchaseCourseDto.userId,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    const course = await command.manager.findOne(Course, {
      where: {
        id: command.purchaseCourseDto.courseId,
      },
    });

    if (!course) throw new NotFoundException('Course not found');

    const coursePurchase = await command.manager.findOne(CoursePurchase, {
      where: {
        user: { id: command.purchaseCourseDto.userId },
        course: { id: command.purchaseCourseDto.courseId },
      },
      relations: {
        user: true,
        course: true,
      },
    });

    if (coursePurchase) throw new ConflictException('This user already purchased this course');

    const createdCoursePurchase = command.manager.create(CoursePurchase, {
      course,
      user,
    });

    return await command.manager.save(createdCoursePurchase);
  }
}
