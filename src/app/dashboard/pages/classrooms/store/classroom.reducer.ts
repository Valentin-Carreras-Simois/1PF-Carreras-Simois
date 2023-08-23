import { createFeature, createReducer, on } from '@ngrx/store';
import { ClassroomActions } from './classroom.actions';
import { ClassroomWithStudentAndCourse } from '../models';
import { Student } from '../../students/models';
import { Course } from '../../courses/models';

export const classroomFeatureKey = 'classroom';

export interface State {
  data: ClassroomWithStudentAndCourse[],
  studentsOptions: Student[],
  coursesOptions: Course[],
  loading: boolean,
  error: unknown
}

export const initialState: State = {
  data: [],
  studentsOptions: [],
  coursesOptions: [],
  loading: false,
  error: null
};

export const reducer = createReducer(
  initialState,

  on(ClassroomActions.loadClassrooms, state => {
    return{
      ...state,
      loading: true
    }
  }),

  on(ClassroomActions.loadClassroomsSuccess, (state, action) => {
    return {
      ...state,
      data:action.data,
      loading: false
    }
  }),

  on(ClassroomActions.loadClassroomsFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      loading: false
    }
  }),

  on(ClassroomActions.loadStudentsOptions, (state) => state),
  on(ClassroomActions.loadStudentsOptionsSuccess, (state, action) => {
    return{
      ...state,
      studentsOptions: action.data
    }
  }),

  on(ClassroomActions.loadCoursesOptions, (state) => state),
  on(ClassroomActions.loadCoursesOptionsSuccess, (state, action) => {
    return{
      ...state,
      coursesOptions: action.data
    }
  }),

);

export const classroomFeature = createFeature({
  name: classroomFeatureKey,
  reducer,
});

