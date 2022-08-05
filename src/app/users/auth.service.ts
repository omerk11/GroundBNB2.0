import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from "./user.model";
import { TokenStorageService } from './token-storage.service';

const AUTH_API = 'http://localhost:3000/api/auth/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient,private tokenStorage: TokenStorageService) { }
  login(email: string, password: string): Observable<any> {
    console.log("auth");
    return this.http.post(AUTH_API + 'login', {
      email,
      password
    }, httpOptions);
  }
  signup(user: User): Observable<any> {
    console.log("signup-angular");
    return this.http.post(AUTH_API + 'signup', user, httpOptions);
  }

  logOutUser()
    {
        this.tokenStorage.signOut();
        return this.http.post(AUTH_API+'logout', httpOptions); 
    }
  
    getUsers() :Observable<User[]>
    {
      return this.http.get<User[]>(AUTH_API+'users',httpOptions);// requesst all Users from app
    }

    updateUser(user :any) :Observable<User>
    {
      const id = user._id;
      const url = AUTH_API+"updateuser/"+id;
      user._id = undefined;
      return this.http.put<User>(url,user,httpOptions);
    }
}