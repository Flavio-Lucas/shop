import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Login } from '../models/login.model';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';

interface HttpResponseWrapper<T> {
  success: T | null;
  error: any | null;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
  ) { }

  private handleError(error: HttpErrorResponse): HttpResponseWrapper<any> {
    return {
      success: null,
      error: error.message
    };
  }

  login(credentials: Login): Promise<HttpResponseWrapper<any> | { success: User; error: null; } | undefined> {
    const url = this.baseUrl + environment.routes.login;
    return this.http.post<{ token: string }>(url, credentials).pipe(
      tap(response => {
        localStorage.setItem(environment.keys.token, response.token);
      }),
      switchMap(response =>
        this.getUser(credentials.username).pipe(
          map(user => ({
            success: user,
            error: null
          })),
          catchError(error => [this.handleError(error)])
        )
      )
    ).toPromise();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(environment.keys.token);
  }

  getUser(username: string): Observable<User> {
    const url = this.baseUrl + environment.routes.users
    return this.http.get<User[]>(`${url}?username=${username}`).pipe(
      map(users => users[0])
    );
  }

  getUserFromStorage(): User | null {
    const user = localStorage.getItem(environment.keys.user);
    return user ? JSON.parse(user) : null;
  }

  logout(): void {
    localStorage.removeItem(environment.keys.token);
    localStorage.removeItem(environment.keys.user);
  }
}
