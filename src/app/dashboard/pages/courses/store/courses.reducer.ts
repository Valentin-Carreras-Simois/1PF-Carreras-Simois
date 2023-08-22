import { createFeature, createReducer, on } from '@ngrx/store';
import { CoursesActions } from './courses.actions';
import { Course } from '../models';
import { COURSE_MOCK } from '../mocks';

export const coursesFeatureKey = 'courses';

export interface State {
  courses: Course[],
  courseDetail: Course | null,
}

export const initialState: State = {
  courses: [],
  courseDetail: null,
};

export const reducer = createReducer(
  initialState,
  on(CoursesActions.loadCourses, state => {
    return{
      ...state,
      courses: COURSE_MOCK
    }
  }),
  on (CoursesActions.loadCourseDetail, (state, action) => {
    return{
      ...state,
      courseDetail: COURSE_MOCK.find((c) => c.id == action.classId) || null,
    }
  })

);

export const coursesFeature = createFeature({
  name: coursesFeatureKey,
  reducer,
});

