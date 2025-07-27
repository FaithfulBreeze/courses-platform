import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { NodemailerService } from '../../../nodemailer/nodemailer.service';
import { DataSource } from 'typeorm';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { LessonVideoUploadedEvent } from './lesson-video-uploaded.event';
import { Lesson } from '../../../lessons/entities/lesson.entity';

@Injectable()
@EventsHandler(LessonVideoUploadedEvent)
export class LessonVideoUploadedHandler implements IEventHandler<LessonVideoUploadedEvent> {
  constructor(
    private readonly mailerService: NodemailerService,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async handle(event: LessonVideoUploadedEvent) {
    const lesson = await this.dataSource.manager.findOne(Lesson, {
      where: {
        id: event.lessonId,
      },
      relations: {
        course: {
          owner: true,
          lessons: true,
        },
      },
    });

    if (!lesson) return;
    let totalCourseDuration = 0;
    lesson.course.lessons.forEach((lesson) => (totalCourseDuration += lesson.duration || 0));
    lesson.course.duration = totalCourseDuration;
    await this.dataSource.manager.save(lesson.course);

    this.mailerService.sendMail({
      addressee: lesson.course.owner.email,
      subject: 'Lesson video uploaded Successfully',
      content: `Your lesson video "${lesson.title}" has been uploaded successfully.`,
    });
  }
}
