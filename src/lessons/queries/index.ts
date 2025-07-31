import { FindLessonCompletedUsersHandler } from './find-lesson-completed-users/find-lesson-completed-users.query';
import { FindLessonCourseHandler } from './find-lesson-course/find-lesson-course.query';
import { FindLessonReviewsCountQueryHandler } from './find-lesson-reviews-count/find-lesson-reviews-count.query';
import { FindLessonReviewsHandler } from './find-lesson-reviews/find-lesson-reviews.query';

export const Queries = [
  FindLessonCompletedUsersHandler,
  FindLessonCourseHandler,
  FindLessonReviewsHandler,
  FindLessonReviewsCountQueryHandler,
];
