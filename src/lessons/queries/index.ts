import { FindLessonCompletedUsersQueryHandler } from "./find-lesson-completed-users/find-lesson-completed-users.query";
import { FindLessonCourseQueryHandler } from "./find-lesson-course/find-lesson-course.query";
import { FindLessonReviewsCountQueryHandler } from "./find-lesson-reviews-count/find-lesson-reviews-count.query";
import { FindLessonReviewsQueryHandler } from "./find-lesson-reviews/find-lesson-reviews.query";

export const Queries = [
  FindLessonCompletedUsersQueryHandler,
  FindLessonCourseQueryHandler,
  FindLessonReviewsQueryHandler,
  FindLessonReviewsCountQueryHandler,
];
