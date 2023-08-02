import { Injectable } from '@angular/core';
import { Student } from './models';
import { BehaviorSubject, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private students$ = new BehaviorSubject <Student[]>([]);

  constructor() { }

  getStudents(): Observable <Student[]> {
    return this.students$.asObservable();
  }

  loadStudents():void{
    this.students$.next([
      {
        id:1,
        name: 'Agustina',
        surname: 'Noceto',
        age: 27
      },
      {
        id:2,
        name: 'Valentin',
        surname: 'Carreras Simois',
        age: 25
      },
      {
        id:3,
        name: 'Mauricio',
        surname: 'Andreu',
        age: 26
      }
    ]);
  }

  create():void{
    this.students$.pipe(take(1)).subscribe({
      next: (arrayActual) =>{
        arrayActual.push({
          id:arrayActual.length + 1,
          name: 'asdasd',
          surname: 'asdasd',
          age: 30
        });

        this.students$.next([...arrayActual]);
      }
    })
  }

  deleteById(id:number):void{
    this.students$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this.students$.next(
          arrayActual.filter((c) => c.id != id)
          );
      }
    })
  }
}
