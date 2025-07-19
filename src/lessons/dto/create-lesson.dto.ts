import { IsInt, IsNotEmpty, IsNumberString, IsString, Length } from 'class-validator';

export class CreateLessonDto {
  @IsString()
  @Length(1, 30)
  @IsNotEmpty()
  title: string;

  @IsString()
  @Length(1, 200)
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsNumberString()
  courseId: number;
}

export class CreateLessonFilesDto {
  video: Express.Multer.File[];
  thumbnail: Express.Multer.File[];
}
