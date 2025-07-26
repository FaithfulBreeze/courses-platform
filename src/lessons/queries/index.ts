import { FindLessonCompletedUsersHandler } from './find-lesson-completed-users/find-lesson-completed-users.query';
import { FindLessonCourseHandler } from './find-lesson-course/find-lesson-course.query';
import { FindLessonReviewsHandler } from './find-lesson-reviews/find-lesson-reviews.query';

export const Queries = [
  FindLessonCompletedUsersHandler,
  FindLessonCourseHandler,
  FindLessonReviewsHandler,
];
