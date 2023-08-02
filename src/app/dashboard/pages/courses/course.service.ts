import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, take } from 'rxjs';
import { Course } from './models';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private courses$ = new BehaviorSubject <Course[]>([]);

  constructor() { }

  getCourses(): Observable <Course[]> {
    return this.courses$.asObservable();
  }

  loadCourses():void{
    this.courses$.next([
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
    ]);
  }

  create():void{
    this.courses$.pipe(take(1)).subscribe({
      next: (arrayActual) =>{
        arrayActual.push({
          id:arrayActual.length + 1,
          name: 'asdasd',
          modality: 'asdasd',
          proffessor: 'asdasdasd'
        });

        this.courses$.next([...arrayActual]);
      }
    })
  }

  deleteById(id:number):void{
    this.courses$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this.courses$.next(
          arrayActual.filter((c) => c.id != id)
          );
      }
    })
  }
}
