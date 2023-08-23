import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromClassroom from './classroom.reducer';

export const selectClassroomState = createFeatureSelector<fromClassroom.State>(
  fromClassroom.classroomFeatureKey
);

export const selectClassrooms = createSelector(selectClassroomState, (state) => state.data)

export const selectStudentsOptions = createSelector(selectClassroomState, (state) => state.studentsOptions)

export const selectCoursesOptions = createSelector(selectClassroomState, (state) => state.coursesOptions)
