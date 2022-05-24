import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {CourseEntityService} from './course-entity.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseResolver implements Resolve<boolean> {

  constructor(private courseEntityService: CourseEntityService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.courseEntityService.getAll().pipe(
        map(courses => !!courses)
    );
  }
}
