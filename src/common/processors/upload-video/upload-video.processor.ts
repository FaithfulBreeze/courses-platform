import { Processor, WorkerHost } from '@nestjs/bullmq';
import { NotFoundException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { Job } from 'bullmq';
import { Course } from '../../../courses/entities/course.entity';
import { FfmpegService } from '../../../ffmpeg/ffmpeg.service';
import { Lesson } from '../../../lessons/entities/lesson.entity';
import { DataSource } from 'typeorm';
import { EventBus } from '@nestjs/cqrs';
import { LessonVideoUploadedEvent } from '../../../lessons/events/lesson-video-uploaded/lesson-video-uploaded.event';

@Processor('upload-video')
export class UploadVideoProcessor extends WorkerHost {
  constructor(
    private readonly FfmpegService: FfmpegService,
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly eventBus: EventBus,
  ) {
    super();
  }
  async process(
    job: Job<{ file: Express.Multer.File; id: number; type: 'trailer' | 'lesson' }>,
  ): Promise<void> {
    const { file, id, type } = job.data;

    const { duration, url } = await this.FfmpegService.uploadAsHls({
      content: file.buffer,
      filename: file.originalname,
    });

    switch (type) {
      case 'lesson': {
        const lesson = await this.dataSource.manager.findOne(Lesson, { where: { id } });

        if (!lesson) throw new NotFoundException('Lesson not found');

        lesson.url = url;
        lesson.duration = duration;
        await this.dataSource.manager.save(lesson);
        this.eventBus.publish(new LessonVideoUploadedEvent(lesson.id));
        break;
      }
      case 'trailer': {
        const course = await this.dataSource.manager.findOne(Course, { where: { id } });

        if (!course) throw new NotFoundException('Course not found');

        course.trailer = url;
        course.trailerDuration = duration;
        await this.dataSource.manager.save(course);
        break;
      }
    }
  }
}
