import { IsInt } from 'class-validator';

export class UpdateUserLastWatchedLessonDto {
  @IsInt()
  lessonId: number;
}
