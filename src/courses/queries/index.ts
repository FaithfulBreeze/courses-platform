import { FindCourseLessonsHandler } from './find-course-lessons/find-course-lessons.query';
import { FindCourseOwnerHandler } from './find-course-owner/find-course-owner.query';
import { FindCourseStudentsHandler } from './find-course-students/find-course-students.query';

export const Queries = [
  FindCourseOwnerHandler,
  FindCourseStudentsHandler,
  FindCourseLessonsHandler,
];
