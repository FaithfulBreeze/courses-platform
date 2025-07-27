import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { NodemailerService } from '../../../nodemailer/nodemailer.service';
import { User } from '../../../users/entities/user.entity';
import { DataSource } from 'typeorm';
import { LessonCreatedEvent } from './lesson-created.event';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@Injectable()
@EventsHandler(LessonCreatedEvent)
export class LessonCreatedHandler implements IEventHandler<LessonCreatedEvent> {
  constructor(
    private readonly mailerService: NodemailerService,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async handle(event: LessonCreatedEvent) {
    const foundUser = await this.dataSource.manager.findOne(User, {
      where: {
        id: event.userId,
      },
      select: {
        email: true,
      },
    });

    if (!foundUser) return;

    this.mailerService.sendMail({
      addressee: foundUser.email,
      subject: 'Lesson Created Successfully',
      content: `Your lesson titled "${event.lesson.title}" has been created successfully.`,
    });
  }
}
