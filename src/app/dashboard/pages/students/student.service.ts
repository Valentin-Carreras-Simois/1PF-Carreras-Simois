import { Injectable } from '@angular/core';
import { CreateStudentData, Student, UpdateStudentData } from './models';
import { BehaviorSubject, Observable, map, mergeMap, take } from 'rxjs';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Course } from '../courses/models';

@Injectable({
  providedIn: 'root'
})

export class StudentService {

  private _students$ = new BehaviorSubject<Student[]>([]);
  private students$ = this._students$.asObservable();

  private _isLoading$ = new BehaviorSubject(false);
  public isLoading$ = this._isLoading$.asObservable();

  constructor(private notifier: NotifierService, private httpClient: HttpClient) { }

  loadStudents():void{
    this._isLoading$.next(true);
    this.httpClient.get<Student[]>(environment.baseApiUrl + '/students', {
      headers: new HttpHeaders({
        'token': '123456789'
      }),
      params: {
        page: 1,
        limit: 50
      }
    }).subscribe({
      next: (response) => {
        this._students$.next(response);
      },
      error: () => {
        this.notifier.showError('Error al cargar los alumnos. Vuelve a intentarlo mas tarde.')
      },
      complete: () => {
        this._isLoading$.next(false);
      }
    })
  }


  getStudents(): Observable<Student[]>{
    return this.students$;
  }

  getStudentById(id:number): Observable <Student | undefined> {
    return this.students$.pipe(
      map((students) => students.find((s) => s.id === id))
      )
  }

  createStudent(payLoad:CreateStudentData):void{
    this.httpClient.post<Student>(environment.baseApiUrl + '/students', payLoad)
    .pipe(
      mergeMap((studentCreated) => this._students$.pipe(
        take(1),
        map((arrayActual) => [...arrayActual, studentCreated])
        )
      )
    )
    .subscribe({
      next: (arrayActualizado) => {
        this._students$.next(arrayActualizado)
      },
    })
  }

  updateStudentById(id:number, estudianteActualizado:UpdateStudentData):void{
    this.httpClient.put(environment.baseApiUrl + '/students/' + id, estudianteActualizado).subscribe({
      next: () => this.loadStudents(),
    })
  }

  deleteStudentById(id:number):void{
    this.httpClient.delete(environment.baseApiUrl + '/students/' + id)
    .pipe()
    .subscribe({
      next: (arrayActualizado) => this.loadStudents(),
    })
  }

  getStudentsbyClassId(classId:number): Observable<Student[]>{
    return this.httpClient.get<Student[]>(environment.baseApiUrl + `/students?classId=${classId}`)
  }
}
