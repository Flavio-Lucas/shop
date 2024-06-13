import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    const url = this.baseUrl + environment.routes.users;
    return this.http.get<User[]>(url);
  }

  getUserById(id: number): Observable<User> {
    const url = this.baseUrl + environment.routes.users;
    return this.http.get<User>(`${url}/${id}`);
  }
}
