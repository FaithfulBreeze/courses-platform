import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UpdateLessonInput } from './dto/update-lesson.input';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { Repository } from 'typeorm';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { QueryBus } from '@nestjs/cqrs';
import { validateVideoFormat } from '../common/utils/validate-video-format.util';
import { validateImageFormat } from '../common/utils/validate-image-format.util';
import { FindLessonReviewsCountQuery } from './queries/find-lesson-reviews-count/find-lesson-reviews-count.query';
import { FindCourseOwnerQuery } from '../courses/queries/find-course-owner/find-course-owner.query';
import { FindLessonCourseQuery } from './queries/find-lesson-course/find-lesson-course.query';
import { FindLessonCompletedUsersQuery } from './queries/find-lesson-completed-users/find-lesson-completed-users.query';
import { FindLessonReviewsQuery } from './queries/find-lesson-reviews/find-lesson-reviews.query';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonsRepository: Repository<Lesson>,
    private readonly queryBus: QueryBus,
    @InjectQueue('upload-video') private readonly uploadVideoQueue: Queue,
    @InjectQueue('upload-image') private readonly uploadImageQueue: Queue,
  ) {}

  async create(createLessonDto: CreateLessonDto, userId: number) {
    const courseOwner = await this.queryBus.execute(new FindCourseOwnerQuery(createLessonDto.courseId));

    if (courseOwner.id !== userId) throw new UnauthorizedException('You do not own this course');

    const [lastCreatedLesson] = await this.lessonsRepository.find({
      where: {
        course: {
          id: createLessonDto.courseId,
        },
      },
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
    validateVideoFormat(file.mimetype);
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
    validateImageFormat(file.mimetype);
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

    this.uploadImageQueue.add('upload-image', { file, lessonId: lesson.id, type: 'lesson' });

    return {
      message: 'Thumbnail upload started',
    };
  }

  findAll(page?: number, limit?: number) {
    return this.lessonsRepository.find({
      order: { order: 'ASC' },
      take: limit || 10,
      skip: page ? (page - 1) * (limit || 10) : 0,
    });
  }

  findLessonCount() {
    return this.lessonsRepository.count();
  }

  findLessonCourse(id: number) {
    return this.queryBus.execute(new FindLessonCourseQuery(id));
  }

  findLessonCompletedUsers(id: number) {
    return this.queryBus.execute(new FindLessonCompletedUsersQuery(id));
  }

  findLessonReviews(id: number, page?: number, limit?: number) {
    return this.queryBus.execute(new FindLessonReviewsQuery(id, page, limit));
  }

  findLessonReviewsCount(id: number) {
    return this.queryBus.execute(new FindLessonReviewsCountQuery(id));
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
