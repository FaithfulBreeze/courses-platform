import { FindUserCompletedLessonsQueryHandler } from './find-user-completed-lessons/find-user-completed-lessons.query';
import { FindUserCourseCompletedLessonsQueryHandler } from './find-user-course-completed-lessons/find-user-course-completed-lessons.query';
import { FindUserPurchasedCoursesQueryHandler } from './find-user-purchased-courses/find-user-purchased-courses.query';

export const Queries = [
  FindUserPurchasedCoursesQueryHandler,
  FindUserCompletedLessonsQueryHandler,
  FindUserCourseCompletedLessonsQueryHandler,
];
