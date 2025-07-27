import {
  Body,
  Controller,
  HttpCode,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { LessonsService } from './lessons.service';
import { AuthGuard } from '../common/guards/auth/auth.guard';
import { User } from '../common/decorators/user/user.decorator';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@User() userId: number, @Body() createLessonDto: CreateLessonDto) {
    return this.lessonsService.create(createLessonDto, userId);
  }

  @Post(':id/upload/video')
  @HttpCode(202)
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('video', { limits: { fileSize: 5 * 1024 * 1024 * 1024 } }))
  uploadLessonVideo(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile(new ParseFilePipe({ fileIsRequired: true }))
    file: Express.Multer.File,
    @User() userId: number,
  ) {
    return this.lessonsService.uploadLessonVideo(id, file, userId);
  }

  @Post(':id/upload/thumbnail')
  @HttpCode(202)
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('thumbnail', { limits: { fileSize: 5 * 1024 * 1024 } }))
  uploadLessonThumbnail(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile(new ParseFilePipe({ fileIsRequired: true }))
    file: Express.Multer.File,
    @User() userId: number,
  ) {
    return this.lessonsService.uploadLessonThumbnail(id, file, userId);
  }
}
