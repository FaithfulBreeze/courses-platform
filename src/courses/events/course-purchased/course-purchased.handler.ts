import { Injectable } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { NodemailerService } from '../../../nodemailer/nodemailer.service';
import { CoursePurchasedEvent } from './course-purchased.event';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../users/entities/user.entity';
import { Course } from '../../../courses/entities/course.entity';

@Injectable()
@EventsHandler(CoursePurchasedEvent)
export class CoursePurchasedEventHandler implements IEventHandler<CoursePurchasedEvent> {
  constructor(
    private readonly mailerService: NodemailerService,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Course) private readonly coursesRepository: Repository<Course>,
  ) {}
  async handle(event: CoursePurchasedEvent) {
    const user = await this.usersRepository.findOne({
      where: { id: event.purchaseCourseDto.userId },
    });

    const course = await this.coursesRepository.findOne({
      where: { id: event.purchaseCourseDto.courseId },
      relations: { owner: true },
    });

    if (!user || !course) return;

    this.mailerService.sendMail({
      addressee: user.email,
      subject: 'Course purchased',
      content: `Congratulations, you just received access to the course: ${course.title}`,
    });

    this.mailerService.sendMail({
      addressee: course.owner.email,
      subject: 'Course purchased',
      content: `Congratulations, a user just purchased your course: ${course.title}`,
    });
  }
}
