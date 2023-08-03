import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, delay, map, of, take } from 'rxjs';
import { Course, CreateCourseData, UpdateCourseData } from './models';

const COURSE_DB: Observable<Course[]> = of([
  {
    id:1,
    name: 'Curso de Angular',
    modality: 'Virtual',
    proffessor: 'Lio Messi'
  },
  {
    id:2,
    name: 'Curso de Javascript',
    modality: 'Virtual',
    proffessor: 'Kun Aguero'
  },
  {
    id:3,
    name: 'Curso de Html Y Css',
    modality: 'Mixto',
    proffessor: 'Julian Alvarez'
  }
]).pipe(delay(1000));

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private subjectCourses$ = new Subject<Course[]>();

  private _courses$ = new BehaviorSubject<Course[]>([]);
  private courses$ = this._courses$.asObservable();


  constructor() { }

  loadCourses():void{
    COURSE_DB.subscribe({
      next: (cursosfromDb) => this._courses$.next(cursosfromDb)
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

  createCourse(course:CreateCourseData):void{
    this.courses$.pipe(take(1)).subscribe({
      next: (arrayActual) =>{
        this._courses$.next([
          ...arrayActual,
          {...course, id: arrayActual.length + 1}
        ]);
      }
    })
  }

  updateCourseById(id:number, cursoActualizado:UpdateCourseData):void{
    this.courses$.pipe(take(1)).subscribe({
      next: (arrayActual) =>{
        this._courses$.next(
          arrayActual.map((c) => c.id === id ? {...c, ...cursoActualizado}: c)
        )
      }
    })
  }

  deleteCourseById(id:number):void{
    this.courses$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._courses$.next(arrayActual.filter((c) => c.id !== id))
      }
    })
  }
}








