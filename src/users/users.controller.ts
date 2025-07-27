import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '../common/guards/auth/auth.guard';
import { User } from '../common/decorators/user/user.decorator';
import { UpdateUserLastWatchedLessonDto } from './dto/update-user-last-watched-lesson.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Patch('/me/last-watched-lesson')
  updateUserLastWatchedLesson(@User() id: number, @Body() lesson: UpdateUserLastWatchedLessonDto) {
    return this.usersService.updateUserLastWatchedLesson(id, lesson);
  }
}
