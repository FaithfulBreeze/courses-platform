import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateLessonInput } from './dto/update-lesson.input';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';
import { Repository } from 'typeorm';
import { NodemailerService } from '../nodemailer/nodemailer.service';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { Course } from '../courses/entities/course.entity';
import { User } from '../users/entities/user.entity';
import { QueryBus } from '@nestjs/cqrs';
import { FindLessonCompletedUsers } from './queries/find-lesson-completed-users/find-lesson-completed-users.query';
import { FindLessonCourse } from './queries/find-lesson-course/find-lesson-course.query';
import { FindLessonReviews } from './queries/find-lesson-reviews/find-lesson-reviews.query';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonsRepository: Repository<Lesson>,
    private readonly queryBus: QueryBus,
    @InjectQueue('create-lesson') private readonly queue: Queue,
    private readonly mailerService: NodemailerService,
  ) {}

  async create(
    createLessonDto: CreateLessonDto,
    userId: number,
    video: { content: Buffer; filename: string },
    thumbnail: { content: Buffer; filename: string },
  ) {
    const isValid = await this.validateLessonCreation(createLessonDto, userId);

    if (!isValid) throw new BadRequestException('Invalid lesson creation request');
    const job = await this.queue.add('create-lesson', {
      createLessonDto,
      userId,
      video,
      thumbnail,
    });

    return {
      message: 'Your lesson creation request is being processed',
      job: job.id,
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
    return `This action returns a #${id} lesson`;
  }

  update(id: number, updateLessonInput: UpdateLessonInput) {
    return `This action updates a #${id} lesson`;
  }

  remove(id: number) {
    return `This action removes a #${id} lesson`;
  }

  private async validateLessonCreation(createLessonDto: CreateLessonDto, userId: number) {
    const course = await this.getCourseByIdAndUserId(createLessonDto.courseId, userId);

    if (!course) await this.handleCourseNotFound(createLessonDto.courseId, userId);

    return course ? true : false;
  }

  private async getCourseByIdAndUserId(courseId: number, userId: number) {
    return await this.lessonsRepository.manager.findOne(Course, {
      where: { id: courseId, owner: { id: userId } },
      relations: {
        owner: true,
      },
    });
  }

  private async handleCourseNotFound(courseId: number, userId: number) {
    const user = await this.lessonsRepository.manager.findOne(User, {
      where: { id: userId },
    });

    if (!user) return;
    this.mailerService.sendMail({
      addressee: user.email,
      subject: 'Course Not Found',
      content: `The course with ID ${courseId} was not found or you do not have permission to access it.`,
    });
  }
}
