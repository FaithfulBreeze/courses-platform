import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { User } from 'src/common/decorators/user/user.decorator';
import { AuthGuard } from 'src/common/guards/auth/auth.guard';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}
  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createCourseDto: CreateCourseDto, @User() userId: number) {
    return this.coursesService.create(createCourseDto, userId);
  }
}
