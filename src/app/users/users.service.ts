import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";//added manualy

import { User } from "./user.model";

@Injectable({providedIn:"root"})
export class UsersService
{

    apiURL = "http://localhost:3000/api/users";// users api url

    httpOptions = // http options?
    {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    constructor(private http:HttpClient)
    {
    }

    getUsers() :Observable<User[]>
    {
        return this.http.get<User[]>(this.apiURL);// requesst all apartments from app
    }

    addUser(user: User) : Observable<User>
    {
        return this.http.post<User>(this.apiURL, user, this.httpOptions);
    }
    // TODO : validate is admin
    updateUser(user: User): Observable<User> 
    {
        const url = `${this.apiURL}/${user._id}`;
        return this.http.put<User>(url, user, this.httpOptions);// JSON.stringify(apartment)?
    }

    // TODO : validate is admin
    deleteApartment(user: User): Observable<User>
    {  
        const url = `${this.apiURL}/${user._id}`;
        return this.http.delete<User>(url);
    }
}
