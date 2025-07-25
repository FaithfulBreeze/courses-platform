import { IsInt } from 'class-validator';

export class PurchaseCourseDto {
  @IsInt()
  userId: number;

  @IsInt()
  courseId: number;
}
