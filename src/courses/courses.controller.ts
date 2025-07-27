import { Body, Controller, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { User } from '../common/decorators/user/user.decorator';
import { AuthGuard } from '../common/guards/auth/auth.guard';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createCourseDto: CreateCourseDto, @User() userId: number) {
    return this.coursesService.create(createCourseDto, userId);
  }

  @Post(':id/purchase')
  @UseGuards(AuthGuard)
  purchase(@Param('id', ParseIntPipe) id: number, @User() userId: number) {
    return this.coursesService.purchase(id, userId);
  }
}
