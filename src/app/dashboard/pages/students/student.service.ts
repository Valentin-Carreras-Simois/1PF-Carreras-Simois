import { Injectable } from '@angular/core';
import { CreateStudentData, Student, UpdateStudentData } from './models';
import { BehaviorSubject, Observable, Subject, delay, map, of, take } from 'rxjs';

const STUDENT_DB: Observable<Student[]> = of([
  {
    id:1,
    name: 'Agustina',
    surname: 'Noceto',
    turno: 'Tarde'
  },
  {
    id:2,
    name: 'Valentin',
    surname: 'Carreras Simois',
    turno: 'Noche'
  },
  {
    id:3,
    name: 'Mauricio',
    surname: 'Andreu',
    turno: 'Tarde'
  }
]).pipe(delay(1000));

@Injectable({
  providedIn: 'root'
})

export class StudentService {

  private subjectStudents$ = new Subject<Student[]>();

  private _students$ = new BehaviorSubject<Student[]>([]);
  private students$ = this._students$.asObservable();


  constructor() { }

  loadStudents():void{
    STUDENT_DB.subscribe({
      next: (usuariosfromDb) => this._students$.next(usuariosfromDb)
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

  createStudent(student:CreateStudentData):void{
    this.students$.pipe(take(1)).subscribe({
      next: (arrayActual) =>{
        this._students$.next([
          ...arrayActual,
          {...student, id: arrayActual.length + 1}
        ]);
      }
    })
  }

  updateStudentById(id:number, estudianteActualizado:UpdateStudentData):void{
    this.students$.pipe(take(1)).subscribe({
      next: (arrayActual) =>{
        this._students$.next(
          arrayActual.map((s) => s.id === id ? {...s, ...estudianteActualizado}: s)
        )
      }
    })
  }

  deleteStudentById(id:number):void{
    this.students$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._students$.next(arrayActual.filter((s) => s.id !== id))
      }
    })
  }
}
