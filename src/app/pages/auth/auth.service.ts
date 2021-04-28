import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User, UserResponse } from '@shared/models/user.interface';
import { environment } from '@env/environment';
import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.api_url;
  helper = new JwtHelperService();
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient
  ) {
    this.checkToken();
  }

  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  login(authData: User): Observable<User> {
    return this.http.post<UserResponse>(`${ this.baseUrl }/auth/login`, authData)
      .pipe(
        map((res) => {
          this.saveToken(res.token);
          this.loggedIn.next(true);
          return res.user;
        }),
        catchError((err) => this.handleError(err))
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }

  checkToken(): void {
    const userToken = localStorage.getItem('token') || '';
    const isExpired = this.helper.isTokenExpired(userToken);
    if (isExpired) {
      this.logout();
    } else {
      this.loggedIn.next(true);
    }
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  handleError(err: any): Observable<never> {
    let errorMessage = 'An error occurred retrieving data';
    if (err) {
      errorMessage = `Error: code ${ err.message }`;
    }

    alert(errorMessage);
    return throwError(errorMessage);
  }
}
