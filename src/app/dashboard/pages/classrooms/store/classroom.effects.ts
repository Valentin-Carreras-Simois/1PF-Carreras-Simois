import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ClassroomActions } from './classroom.actions';
import { HttpClient } from '@angular/common/http';
import { Classroom, ClassroomWithStudentAndCourse, CreateClassroomPayload } from '../models';
import { environment } from 'src/environments/environment';
import { StudentService } from '../../students/student.service';
import { Student } from '../../students/models';
import { Course } from '../../courses/models';
import { Store } from '@ngrx/store';


@Injectable()
export class ClassroomEffects {

  loadClassrooms$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(ClassroomActions.loadClassrooms),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.getClassroomsFromDB().pipe(
          map(data => ClassroomActions.loadClassroomsSuccess({ data })),
          catchError(error => of(ClassroomActions.loadClassroomsFailure({ error }))))
      )
    );
  });

  loadStudentsOptions$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(ClassroomActions.loadStudentsOptions),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.getStudentsOptions().pipe(
          map(data => ClassroomActions.loadStudentsOptionsSuccess({ data })),
          catchError(error => of(ClassroomActions.loadStudentsOptionsFailure({ error }))))
      )
    );
  });

  loadCoursesOptions$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(ClassroomActions.loadCoursesOptions),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.getCoursesOptions().pipe(
          map(data => ClassroomActions.loadCoursesOptionsSuccess({ data })),
          catchError(error => of(ClassroomActions.loadCoursesOptionsFailure({ error }))))
      )
    );
  });

  createClassroom$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(ClassroomActions.createClassrooms),
      concatMap((action) =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        this.createClassrooms(action.payload).pipe(
          map(data => ClassroomActions.createClassroomsSuccess({ data })),
          catchError(error => of(ClassroomActions.createClassroomsFailure({ error }))))
      )
    );
  });

  createClassroomSuccess$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(ClassroomActions.createClassroomsSuccess),
      map(() => this.store.dispatch(ClassroomActions.loadClassrooms()))
    );
  }, { dispatch: false});

  deleteClassroom$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ClassroomActions.deleteClassroom),
      concatMap(action =>
        this.deleteClassroomFromDB(action.id).pipe(
          map(() => ClassroomActions.deleteClassroomSuccess({ id: action.id })),
          catchError(error => of(ClassroomActions.deleteClassroomFailure({ error })))
        )
      )
    );
  });


  constructor(private actions$: Actions, private httpClient:HttpClient, private store: Store) {}

  private getClassroomsFromDB(): Observable<ClassroomWithStudentAndCourse[]> {
    return this.httpClient.get<ClassroomWithStudentAndCourse[]>(environment.baseApiUrl + '/classrooms?_expand=student&_expand=course')
  }

  private getStudentsOptions(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(environment.baseApiUrl + '/students')
  }

  private getCoursesOptions(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(environment.baseApiUrl + '/courses')
  }

  private createClassrooms(payload: CreateClassroomPayload): Observable<Classroom>{
    return this.httpClient.post<Classroom>(environment.baseApiUrl + '/classrooms', payload)
  }

  private deleteClassroomFromDB(id: number): Observable<void> {
    const url = `${environment.baseApiUrl}/classrooms/${id}`;
    return this.httpClient.delete<void>(url);
  }
}
