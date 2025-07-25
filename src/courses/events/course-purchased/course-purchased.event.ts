import { PurchaseCourseDto } from '../../../courses/dto/purchase-course.dto';

export class CoursePurchasedEvent {
  constructor(public readonly purchaseCourseDto: PurchaseCourseDto) {}
}
