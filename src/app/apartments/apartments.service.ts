import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";//added manualy

import { Apartment } from "./apartment.model";

@Injectable({providedIn:"root"})
export class ApartmentsService
{

    apiURL = "http://localhost:3000/api/apartments";// apartments api url

    httpOptions = // http options?
    {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    constructor(private http:HttpClient)
    {
    }

    getApartments() :Observable<Apartment[]>
    {
        return this.http.get<Apartment[]>(this.apiURL);// requesst all apartments from app
    }

    addApartment(apartment: Apartment) : Observable<Apartment>
    {
        return this.http.post<Apartment>(this.apiURL, apartment, this.httpOptions);
    }
    // TODO : validate my apartment
    updateApartment(apartment: Apartment): Observable<Apartment> 
    {
        const url = `${this.apiURL}/${apartment.id}`;
        return this.http.put<Apartment>(url, JSON.stringify(apartment), this.httpOptions);// JSON.stringify(apartment)?
    }

    // TODO : validate my apartment
    deleteApartment(apartment: Apartment): Observable<Apartment>
    {
        const url = `${this.apiURL}/${apartment.id}`;
        return this.http.delete<Apartment>(url);
    }
}