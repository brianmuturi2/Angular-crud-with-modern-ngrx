import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {Course} from './model/course';
import {select, Store} from '@ngrx/store';
import {AppState} from '../reducers';
import {filter, finalize, first, tap} from 'rxjs/operators';
import {loadAllCourses} from './course.actions';
import {areCoursesLoaded} from './course.selectors';

@Injectable()
export class CoursesResolver implements Resolve<any> {

  loading = false;

  constructor(private store: Store<AppState>) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.store.pipe(
        select(areCoursesLoaded),
        tap(coursesLoaded => {
            if (!this.loading && !coursesLoaded) {
                this.loading = true;
                this.store.dispatch(loadAllCourses());
            }
        }),
        filter(coursesLoaded => coursesLoaded),
        first(),
        finalize(() => this.loading = false)
    );
  }
}
