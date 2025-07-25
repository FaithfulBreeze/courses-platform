import { ConflictException, Injectable } from '@nestjs/common';
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

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
