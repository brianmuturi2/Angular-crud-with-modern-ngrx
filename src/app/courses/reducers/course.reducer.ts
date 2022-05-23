import { Action, createReducer, on } from '@ngrx/store';
import {createEntityAdapter, EntityState} from '@ngrx/entity';
import {compareCourses, Course} from '../model/course';
import {CourseActions} from '../action-types';


export const courseFeatureKey = 'courses';

export interface CourseState extends EntityState<Course>{
    allCoursesLoaded: boolean;
}

export const adapter = createEntityAdapter<Course>({
    sortComparer: compareCourses
});

export const initialCourseState = adapter.getInitialState({
    allCoursesLoaded: false
});

export const courseReducer = createReducer(
    initialCourseState,

    on(CourseActions.loadCoursesSuccess,
        (state, action) => adapter.addAll(action.courses, {...state, allCoursesLoaded: true})),

    on(CourseActions.updateCourse,
        (state, action) => adapter.updateOne(action.update, state))
);

export const {
    selectAll,
    selectEntities,
    selectIds,
    selectTotal
} = adapter.getSelectors();
