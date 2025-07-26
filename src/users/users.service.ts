import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { CreateUserDto } from './dto/create-user.dto';
import { QueryBus } from '@nestjs/cqrs';
import { FindUserPurchasedCoursesQuery } from './queries/find-user-purchased-courses/find-user-purchased-courses.query';
import { FindUserCompletedLessons } from './queries/find-user-completed-lessons/find-user-completed-lessons.query';
import { CoursePurchase } from '../courses/entities/course-purchase.entity';
import { UpdateUserLastWatchedLessonDto } from './dto/update-user-last-watched-lesson.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly queryBus: QueryBus,
    private readonly bcryptService: BcryptService,
  ) {}

  create(createUserInput: CreateUserDto) {
    return this.usersRepository.manager.transaction(async (manager) => {
      const foundEmail = await manager.findOne(User, {
        where: { email: createUserInput.email },
      });

      if (foundEmail) throw new ConflictException('Email already in use');
      const hashedPassword = await this.bcryptService.encode(createUserInput.password);
      const createdUser = manager.create(User, {
        ...createUserInput,
        password: hashedPassword,
      });
      await manager.save(createdUser);

      return { message: 'User created successfully', id: createdUser.id };
    });
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOne({ where: { id } });
  }

  findUserPurchasedCourses(id: number) {
    return this.queryBus.execute(new FindUserPurchasedCoursesQuery(id));
  }

  findUserCompletedLessons(id: number) {
    return this.queryBus.execute(new FindUserCompletedLessons(id));
  }

  async findUserLastCoursePurchases(id: number, limit: number) {
    return this.usersRepository.manager.find(CoursePurchase, {
      where: {
        user: {
          id,
        },
      },
      take: limit,
      order: {
        purchasedAt: 'DESC',
      },
      relations: {
        user: true,
        course: true,
      },
    });
  }

  async findUserLastWatchedLesson(id: number) {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
      relations: { lastWatchedLesson: true },
    });

    if (!user) throw new NotFoundException('User not found');

    return user.lastWatchedLesson;
  }

  async updateUserLastWatchedLesson(id: number, { lessonId }: UpdateUserLastWatchedLessonDto) {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
      relations: {
        purchasedCourses: {
          lessons: true,
        },
      },
    });

    if (!user) throw new NotFoundException('User not found');

    const course = user.purchasedCourses.find((c) => c.lessons.some((l) => l.id === lessonId));

    if (!course) throw new UnauthorizedException('The user does not own the course');

    const lesson = course.lessons.find((l) => l.id === lessonId);

    if (!lesson) throw new NotFoundException('Lesson not found');

    user.lastWatchedLesson = lesson;
    await this.usersRepository.save(user);

    return lesson;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
