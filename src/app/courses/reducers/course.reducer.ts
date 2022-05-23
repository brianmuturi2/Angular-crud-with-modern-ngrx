import { Action, createReducer, on } from '@ngrx/store';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {compareCourses, Course} from '../model/course';
import {CourseActions} from '../action-types';


export const courseFeatureKey = 'courses';

export interface CourseState extends EntityState<Course>{
}

export const adapter = createEntityAdapter<Course>({
    sortComparer: compareCourses
});

export const initialCourseState = adapter.getInitialState();

export const courseReducer = createReducer(
    initialCourseState,

    on(CourseActions.loadCoursesSuccess,
        (state, action) => adapter.addAll(action.courses, state))
);

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
