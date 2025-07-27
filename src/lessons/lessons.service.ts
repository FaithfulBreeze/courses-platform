import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UpdateLessonInput } from './dto/update-lesson.input';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { Repository } from 'typeorm';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { QueryBus } from '@nestjs/cqrs';
import { FindLessonCompletedUsers } from './queries/find-lesson-completed-users/find-lesson-completed-users.query';
import { FindLessonCourse } from './queries/find-lesson-course/find-lesson-course.query';
import { FindLessonReviews } from './queries/find-lesson-reviews/find-lesson-reviews.query';
import { FindCourseOwner } from 'src/courses/queries/find-course-owner/find-course-owner.query';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonsRepository: Repository<Lesson>,
    private readonly queryBus: QueryBus,
    @InjectQueue('upload-video') private readonly uploadVideoQueue: Queue,
    @InjectQueue('upload-thumbnail') private readonly uploadThumbnailQueue: Queue,
  ) {}

  async create(createLessonDto: CreateLessonDto, userId: number) {
    const courseOwner = await this.queryBus.execute(new FindCourseOwner(createLessonDto.courseId));

    if (courseOwner.id !== userId) throw new UnauthorizedException('You do not own this course');

    const [lastCreatedLesson] = await this.lessonsRepository.find({
      order: {
        order: 'DESC',
      },
      take: 1,
    });

    const createdLesson = this.lessonsRepository.create({
      ...createLessonDto,
      order: lastCreatedLesson ? lastCreatedLesson.order + 1 : 0,
    });

    return await this.lessonsRepository.save(createdLesson);
  }

  async uploadLessonVideo(id: number, file: Express.Multer.File, userId: number) {
    const lesson = await this.lessonsRepository.findOne({
      where: {
        id,
      },
      relations: {
        course: {
          owner: true,
        },
      },
    });

    if (!lesson) throw new NotFoundException('Lesson not found');
    if (lesson.course.owner.id !== userId)
      throw new UnauthorizedException('You do not own this course');

    this.uploadVideoQueue.add('upload-video', { file, id, type: 'lesson' });

    return {
      message: 'Video upload started',
    };
  }

  async uploadLessonThumbnail(id: number, file: Express.Multer.File, userId: number) {
    const lesson = await this.lessonsRepository.findOne({
      where: {
        id,
      },
      relations: {
        course: {
          owner: true,
        },
      },
    });

    if (!lesson) throw new NotFoundException('Lesson not found');
    if (lesson.course.owner.id !== userId)
      throw new UnauthorizedException('You do not own this course');

    this.uploadThumbnailQueue.add('upload-thumbnail', { file, lessonId: lesson.id });

    return {
      message: 'Thumbnail upload started',
    };
  }

  findAll() {
    return this.lessonsRepository.find();
  }

  findLessonCourse(id: number) {
    return this.queryBus.execute(new FindLessonCourse(id));
  }

  findLessonCompletedUsers(id: number) {
    return this.queryBus.execute(new FindLessonCompletedUsers(id));
  }

  findLessonReviews(id: number) {
    return this.queryBus.execute(new FindLessonReviews(id));
  }

  findOne(id: number) {
    return this.lessonsRepository.findOne({
      where: {
        id,
      },
    });
  }

  update(id: number, updateLessonInput: UpdateLessonInput) {
    return `This action updates a #${id} lesson`;
  }

  remove(id: number) {
    return `This action removes a #${id} lesson`;
  }
}
