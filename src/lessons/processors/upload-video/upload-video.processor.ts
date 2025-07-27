import { Processor, WorkerHost } from '@nestjs/bullmq';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'bullmq';
import { FfmpegService } from 'src/ffmpeg/ffmpeg.service';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { Repository } from 'typeorm';

@Processor('upload-video')
export class UploadVideoProcessor extends WorkerHost {
  constructor(
    private readonly FfmpegService: FfmpegService,
    @InjectRepository(Lesson) private readonly lessonsRepository: Repository<Lesson>,
  ) {
    super();
  }
  async process(job: Job<{ file: Express.Multer.File; lessonId: number }>): Promise<void> {
    const { file, lessonId } = job.data;

    const videoUrl = await this.FfmpegService.uploadAsHls({
      content: file.buffer,
      filename: file.originalname,
    });

    const lesson = await this.lessonsRepository.findOne({ where: { id: lessonId } });

    if (!lesson) throw new NotFoundException('Lesson not found');

    lesson.url = videoUrl;
    await this.lessonsRepository.save(lesson);
  }
}
