import { Injectable } from '@angular/core';
import { LoginPayload } from './models';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { User } from '../dashboard/pages/users/models';
import { NotifierService } from '../core/services/notifier.service';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _authUser$ = new BehaviorSubject< User | null >(null);
  public authUsers$ = this._authUser$.asObservable();

  constructor(
    private notifierService:NotifierService,
    private router:Router, 
    private httpClient: HttpClient) {}

  isAuthenticated(): Observable<boolean> {
    return this.httpClient.get<User[]>(environment.baseApiUrl + '/users', {
      params: {
        token: localStorage.getItem('token') || '',
      }
    }).pipe(
      map((userResult) => {
        return !!userResult.length
      })
    )
  }

  login(payLoad: LoginPayload): void {

    this.httpClient.get<User[]>(environment.baseApiUrl + '/users', {
      params: {
        email: payLoad.email || '',
        password: payLoad.password || ''
      }
    }).subscribe({
      next: (response) => {
        if (response.length) {
          const authUser = response[0];
          this._authUser$.next(response[0]);
          this.router.navigate(['/dashboard']);
          localStorage.setItem('token', authUser.token);
        } else {
          this.notifierService.showError('Email o Contraseña invalida');
          this._authUser$.next(null);
        }
      },
      error: (err) =>{
        if (err instanceof HttpErrorResponse ) {
          let message = 'Ocurrio un error inesperado';
          if (err.status === 500){
            message = 'Error del servicio interno'
          }
          if (err.status === 401){
            message = 'Email o contraseña invalida'
          }
          this.notifierService.showError(message)
        }
      }
    })

  }
}
