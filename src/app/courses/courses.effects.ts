import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {CourseActions} from './action-types';
import {CoursesHttpService} from './services/courses-http.service';
import {concatMap, map} from 'rxjs/operators';
import {loadCoursesSuccess} from './course.actions';



@Injectable()
export class CoursesEffects {

  loadCourses$ = createEffect(
      () => this.actions$.pipe(
          ofType(CourseActions.loadAllCourses),
          concatMap(action => this.coursesHttpService.findAllCourses()),
          map(courses => loadCoursesSuccess({courses}))
      )
  );

  constructor(private actions$: Actions,
              private coursesHttpService: CoursesHttpService) {}

}
