import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { User } from '../common/decorators/user/user.decorator';
import { AuthGuard } from '../common/guards/auth/auth.guard';
import { PurchaseCourseDto } from './dto/purchase-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createCourseDto: CreateCourseDto, @User() userId: number) {
    return this.coursesService.create(createCourseDto, userId);
  }

  @Post('/purchase')
  @UseGuards(AuthGuard)
  purchase(purchaseCourseDto: PurchaseCourseDto) {
    return this.coursesService.purchase(purchaseCourseDto);
  }
}
