import { Injectable } from '@angular/core';
import { Course, CreateCourseData, UpdateCourseData } from './models';
import { BehaviorSubject, Observable, map, mergeMap, take } from 'rxjs';
import { NotifierService } from 'src/app/core/services/notifier.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private _courses$ = new BehaviorSubject<Course[]>([]);
  private courses$ = this._courses$.asObservable();

  private _isLoading$ = new BehaviorSubject(false);
  public isLoading$ = this._isLoading$.asObservable();

  constructor(private notifier: NotifierService, private httpClient: HttpClient) { }

  loadCourses():void{
    this._isLoading$.next(true);
    this.httpClient.get<Course[]>(environment.baseApiUrl + '/courses', {
      headers: new HttpHeaders({
        'token': '123456789'
      }),
      params: {
        page: 1,
        limit: 50
      }
    }).subscribe({
      next: (response) => {
        this._courses$.next(response);
      },
      error: () => {
        this.notifier.showError('Error al cargar los cursos. Vuelve a intentarlo mas tarde.')
      },
      complete: () => {
        this._isLoading$.next(false);
      }
    })
  }


  getCourses(): Observable<Course[]>{
    return this.courses$;
  }

  getCourseById(id:number): Observable <Course | undefined> {
    return this.courses$.pipe(
      map((courses) => courses.find((c) => c.id === id))
      )
  }

  createCourse(payLoad:CreateCourseData):void{
    this.httpClient.post<Course>(environment.baseApiUrl + '/courses', payLoad)
    .pipe(
      mergeMap((courseCreated) => this._courses$.pipe(
        take(1),
        map((arrayActual) => [...arrayActual, courseCreated])
        )
      )
    )
    .subscribe({
      next: (arrayActualizado) => {
        this._courses$.next(arrayActualizado)
      },
    })
  }

  updateCourseById(id:number, cursoActualizado:UpdateCourseData):void{
    this.httpClient.put(environment.baseApiUrl + '/courses/' + id, cursoActualizado).subscribe({
      next: () => this.loadCourses(),
    })
  }

  deleteCourseById(id:number):void{
    this.httpClient.delete(environment.baseApiUrl + '/courses/' + id)
    .pipe()
    .subscribe({
      next: (arrayActualizado) => this.loadCourses(),
    })
  }
}
