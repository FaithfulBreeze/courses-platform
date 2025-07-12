import { Processor, WorkerHost } from '@nestjs/bullmq';
import { InjectDataSource } from '@nestjs/typeorm';
import { Job } from 'bullmq';
import { VercelCdnService } from '../../../vercel-cdn/vercel-cdn.service';
import { DataSource } from 'typeorm';
import { Lesson } from '../../entities/lesson.entity';
import { EventBus } from '@nestjs/cqrs';
import { LessonCreatedEvent } from '../../events/lesson-created/lesson-created.event';

@Processor('create-lesson')
export class CreateLessonProcessor extends WorkerHost {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly cdnService: VercelCdnService,
    private readonly eventBus: EventBus,
  ) {
    super();
  }
  async process(job: Job) {
    const { createLessonDto, userId, video, thumbnail } = job.data;

    const [videoUrl, videoThumbnail] = await Promise.all([
      await this.cdnService.store({
        ...video,
        content: Buffer.from(video.content),
      }),
      await this.cdnService.store({
        ...thumbnail,
        content: Buffer.from(thumbnail.content),
      }),
    ]);

    await this.dataSource.transaction(async (manager) => {
      const lesson = manager.create(Lesson, {
        ...createLessonDto,
        userId,
        videoUrl,
        videoThumbnail,
      });

      try {
        await manager.save(lesson);
        this.eventBus.publish(new LessonCreatedEvent(lesson, userId));
      } catch (error) {
        this.cdnService.delete(videoUrl);
        this.cdnService.delete(videoThumbnail);
        throw error;
      }
    });
  }
}
