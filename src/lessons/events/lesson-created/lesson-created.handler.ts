import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectDataSource } from '@nestjs/typeorm';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';
import { User } from 'src/users/entities/user.entity';
import { DataSource } from 'typeorm';
import { LessonCreatedEvent } from './lesson-created.event';
import { IEventHandler } from '@nestjs/cqrs';

@Injectable()
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
