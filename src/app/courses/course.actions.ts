import { createAction, props } from '@ngrx/store';
import {Course} from './model/course';

export const loadAllCourses = createAction(
  '[Courses Resolver] Load All Courses'
);

export const loadCoursesSuccess = createAction(
  '[Load Courses Effect] Load All Courses Success',
  props<{ courses: Course[] }>()
);

export const loadCoursesFailure = createAction(
  '[Load Courses Effect] Load All Courses Failure',
  props<{ error: any }>()
);
