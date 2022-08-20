import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from "./user.model";
import { TokenStorageService } from './token-storage.service';

const AUTH_API = 'http://localhost:3000/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }
  login(email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      email,
      password
    }, httpOptions);
  }
  signup(user: User): Observable<any> {
    return this.http.post(AUTH_API + 'signup', user, httpOptions);
  }

  logOutUser() {
    this.tokenStorage.signOut();
    return this.http.post(AUTH_API + 'logout', httpOptions);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(AUTH_API + 'users', httpOptions);// requesst all Users from app
  }

  updateUser(user: any): Observable<any> {
    const url = AUTH_API + "updateuser/" + user._id;
    return this.http.put<User>(url, user, httpOptions);
  }

  deleteUser(userId: any): Observable<any> {
    const url = AUTH_API + "deleteuser/" + userId;
    return this.http.delete<User>(url, httpOptions);
  }
  getUserById(id: string): Observable<User> {
    const url = `${AUTH_API}getuser/${id}`;
    return this.http.get<User>(url);
  }
}