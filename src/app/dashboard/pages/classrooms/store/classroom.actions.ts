import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Classroom, ClassroomWithStudentAndCourse, CreateClassroomPayload } from '../models';
import { HttpErrorResponse } from '@angular/common/http';
import { Course } from '../../courses/models';
import { Student } from '../../students/models';

export const ClassroomActions = createActionGroup({
  source: 'Classroom',
  events: {
    'Load Classrooms': emptyProps(),
    'Load Classrooms Success': props<{ data: ClassroomWithStudentAndCourse[] }>(),
    'Load Classrooms Failure': props<{ error: HttpErrorResponse }>(),

    'Load Courses Options': emptyProps(),
    'Load Courses Options Success': props<{ data: Course[] }>(),
    'Load Courses Options Failure': props<{ error: HttpErrorResponse }>(),

    'Load Students Options': emptyProps(),
    'Load Students Options Success': props<{ data: Student[] }>(),
    'Load Students Options Failure': props<{ error: HttpErrorResponse }>(),

    'Create Classrooms': props<{payload: CreateClassroomPayload}>(),
    'Create Classrooms Success': props<{ data: Classroom }>(),
    'Create Classrooms Failure': props<{ error: HttpErrorResponse }>()
  }
});
