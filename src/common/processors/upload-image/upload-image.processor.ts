import { Processor, WorkerHost } from '@nestjs/bullmq';
import { NotFoundException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { Job } from 'bullmq';
import { Course } from '../../../courses/entities/course.entity';
import { Lesson } from '../../../lessons/entities/lesson.entity';
import { DataSource } from 'typeorm';
import { VercelCdnService } from '../../../vercel-cdn/vercel-cdn.service';
import { User } from '../../../users/entities/user.entity';

@Processor('upload-image')
export class UploadImageProcessor extends WorkerHost {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly cdnService: VercelCdnService,
  ) {
    super();
  }
  async process(
    job: Job<{ file: Express.Multer.File; id: number; type: 'course' | 'lesson' | 'user' }>,
  ): Promise<void> {
    const { file, id, type } = job.data;

    const url = await this.cdnService.store({
      filename: file.originalname,
      content: Buffer.from(file.buffer),
    });

    switch (type) {
      case 'lesson': {
        const lesson = await this.dataSource.manager.findOne(Lesson, { where: { id } });

        if (!lesson) throw new NotFoundException('Lesson not found');

        lesson.thumbnail = url;
        await this.dataSource.manager.save(lesson);
        break;
      }
      case 'course': {
        const course = await this.dataSource.manager.findOne(Course, { where: { id } });

        if (!course) throw new NotFoundException('Course not found');

        course.thumbnail = url;
        await this.dataSource.manager.save(course);
        break;
      }
      case 'user': {
        const user = await this.dataSource.manager.findOne(User, { where: { id } });

        if (!user) throw new NotFoundException('User not found');

        user.avatar = url;
        await this.dataSource.manager.save(user);
        break;
      }
    }
  }
}
