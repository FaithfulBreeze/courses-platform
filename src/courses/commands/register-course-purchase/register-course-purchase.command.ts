import { ConflictException, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CoursePurchase } from '../../../courses/entities/course-purchase.entity';
import { Course } from '../../../courses/entities/course.entity';
import { User } from '../../../users/entities/user.entity';
import { EntityManager } from 'typeorm';

export class RegisterCoursePurchaseCommand {
  constructor(
    public readonly courseId: number,
    public readonly userId: number,
    public readonly manager: EntityManager,
  ) {}
}

@CommandHandler(RegisterCoursePurchaseCommand)
export class RegisterCoursePurchaseCommandHandler
  implements ICommandHandler<RegisterCoursePurchaseCommand, Partial<CoursePurchase>>
{
  async execute(command: RegisterCoursePurchaseCommand): Promise<Partial<CoursePurchase>> {
    const user = await command.manager.findOne(User, {
      where: {
        id: command.userId,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    const course = await command.manager.findOne(Course, {
      where: {
        id: command.courseId,
      },
    });

    if (!course) throw new NotFoundException('Course not found');

    const coursePurchase = await command.manager.findOne(CoursePurchase, {
      where: {
        user: { id: command.userId },
        course: { id: command.courseId },
      },
      relations: {
        user: true,
        course: true,
      },
    });

    if (coursePurchase) throw new ConflictException('You already purchased this course');

    const createdCoursePurchase = command.manager.create(CoursePurchase, {
      course,
      user,
    });

    const savedCoursePurchase = await command.manager.save(createdCoursePurchase);

    return { ...savedCoursePurchase, user: undefined };
  }
}
