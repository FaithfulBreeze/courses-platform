import { UpdateUserPurchasedCoursesCommandHandler } from '../../users/commands/update-user-purchased-courses/update-user-purchased-courses.command';
import { RegisterCoursePurchaseCommandHandler } from './register-course-purchase/register-course-purchase.command';

export const Commands = [
  RegisterCoursePurchaseCommandHandler,
  UpdateUserPurchasedCoursesCommandHandler,
];
