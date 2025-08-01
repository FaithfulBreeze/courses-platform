import { FindCourseLessonsCountHandler } from './find-course-lessons-count/find-course-lessons-count.query';
import { FindCourseLessonsHandler } from './find-course-lessons/find-course-lessons.query';
import { FindCourseOwnerHandler } from './find-course-owner/find-course-owner.query';
import { FindCourseReviewsCountHandler } from './find-course-reviews-count/find-course-reviews-count.query';
import { FindCourseReviewsHandler } from './find-course-reviews/find-course-reviews.query';
import { FindCourseStudentsHandler } from './find-course-students/find-course-students.query';

export const Queries = [
  FindCourseOwnerHandler,
  FindCourseStudentsHandler,
  FindCourseLessonsHandler,
  FindCourseReviewsHandler,
  FindCourseLessonsCountHandler,
  FindCourseReviewsCountHandler,
];
