import {
  Body,
  Controller,
  HttpCode,
  ParseFilePipe,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { CreateLessonDto, CreateLessonFilesDto } from './dto/create-lesson.dto';
import { LessonsService } from './lessons.service';
import { parseFileConfig } from '../common/utils/parse-file.utils';
import { AuthGuard } from '../common/guards/auth/auth.guard';
import { User } from '../common/decorators/user/user.decorator';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Post()
  @HttpCode(202)
  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'video', maxCount: 1 },
      { name: 'thumbnail', maxCount: 1 },
    ]),
  )
  create(
    @User() id: number,
    @Body() createLessonDto: CreateLessonDto,
    @UploadedFiles(new ParseFilePipe(parseFileConfig(['video', 'thumbnail'])))
    files: CreateLessonFilesDto,
  ) {
    const video = {
      content: files.video[0].buffer,
      filename: files.video[0].originalname,
    };
    const thumbnail = {
      content: files.thumbnail[0].buffer,
      filename: files.thumbnail[0].originalname,
    };

    return this.lessonsService.create(createLessonDto, id, video, thumbnail);
  }
}
