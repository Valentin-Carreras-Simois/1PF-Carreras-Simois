import { Injectable } from '@angular/core';
import { LoginPayload } from './models';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { User } from '../dashboard/pages/users/models';
import { NotifierService } from '../core/services/notifier.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
    return this.authUsers$.pipe(
      take (1),
      map ((user) => !!user),
    );
  }

  login(payLoad: LoginPayload): void {

    this.httpClient.get<User[]>('http://localhost:3000/users', {
      params: {
        email: payLoad.email || '',
        password: payLoad.password || ''
      }
    }).subscribe({
      next: (response) => {
        if (response.length) {
          this._authUser$.next(response[0]);
          this.router.navigate(['/dashboard']);
        } else {
          this.notifierService.showError('Email o Contraseña invalida');
          this._authUser$.next(null);
        }
      }
    })

  }
}
