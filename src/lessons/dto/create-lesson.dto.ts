import { IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateLessonDto {
  @IsString()
  @Length(1, 30)
  @IsNotEmpty()
  title: string;

  @IsString()
  @Length(1, 200)
  @IsNotEmpty()
  description: string;

  @IsInt()
  courseId: number;
}
