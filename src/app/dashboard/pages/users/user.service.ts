import { Injectable } from '@angular/core';
import { CreateUserData, UpdateUserData, User } from './models';
import { BehaviorSubject, Observable, Subject, delay, map, of, take } from 'rxjs';

const USER_DB: Observable<User[]> = of([
  {
    id:1,
    name: 'Vicente',
    surname: 'Carreras',
    email: 'vicentecs@gmail.com',
    password: 'jejejejijiji'
  },
  {
    id:2,
    name: 'Alejandra',
    surname: 'Simois',
    email: 'alejandrasimua@gmail.com',
    password: 'jojojojujuju'
  }
]).pipe(delay(1000));

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private subjectUsers$ = new Subject<User[]>();

  private _users$ = new BehaviorSubject<User[]>([]);
  private users$ = this._users$.asObservable();


  constructor() { }

  loadUsers():void{
    USER_DB.subscribe({
      next: (usuariosfromDb) => this._users$.next(usuariosfromDb)
    })
  }


  getUsers(): Observable<User[]>{
    return this.users$;
  }

  getUserById(id:number): Observable <User | undefined> {
    return this.users$.pipe(
      map((users) => users.find((u) => u.id === id))
      )
  }

  createUser(user:CreateUserData):void{
    this.users$.pipe(take(1)).subscribe({
      next: (arrayActual) =>{
        this._users$.next([
          ...arrayActual,
          {...user, id: arrayActual.length + 1}
        ]);
      }
    })
  }

  updateUserById(id:number, usuarioActualizado:UpdateUserData):void{
    this.users$.pipe(take(1)).subscribe({
      next: (arrayActual) =>{
        this._users$.next(
          arrayActual.map((u) => u.id === id ? {...u, ...usuarioActualizado}: u)
        )
      }
    })
  }

  deleteUserById(id:number):void{
    this.users$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._users$.next(arrayActual.filter((u) => u.id !== id))
      }
    })
  }
}

