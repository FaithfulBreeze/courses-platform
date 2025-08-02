import { FindCourseLessonsCountQueryHandler } from "./find-course-lessons-count/find-course-lessons-count.query";
import { FindCourseLessonsQueryHandler } from "./find-course-lessons/find-course-lessons.query";
import { FindCourseOwnerQueryHandler } from "./find-course-owner/find-course-owner.query";
import { FindCourseReviewsCountQueryHandler } from "./find-course-reviews-count/find-course-reviews-count.query";
import { FindCourseReviewsQueryHandler } from "./find-course-reviews/find-course-reviews.query";
import { FindCourseStudentsQueryHandler } from "./find-course-students/find-course-students.query";

export const Queries = [
  FindCourseOwnerQueryHandler,
  FindCourseStudentsQueryHandler,
  FindCourseLessonsQueryHandler,
  FindCourseReviewsQueryHandler,
  FindCourseLessonsCountQueryHandler,
  FindCourseReviewsCountQueryHandler,
];
