import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";//added manualy

import { Apartment } from "./apartment.model";
import { TokenStorageService } from "../users/token-storage.service";

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

    constructor(private http:HttpClient, private tokenStorage: TokenStorageService)
    {
    }

    getApartments(params?: string) :Observable<Apartment[]>
    {
        if(params)
        {
            return this.http.get<Apartment[]>(this.apiURL+params);
        }
        else
        {
            return this.http.get<Apartment[]>(this.apiURL);// requesst all apartments from app
        }
    }

    getApartmentById(id: string) :Observable<Apartment>
    {
        const url = `${this.apiURL}/${id}`;
        return this.http.get<Apartment>(url);
    }

    getApartmentsByOwnerId() :Observable<Apartment[]>
    {
        let id = this.tokenStorage.getMyId();
        const url = `${this.apiURL}/getapartmentsbyownerid/${id}`;
        return this.http.get<Apartment[]>(url);
    }

    addApartment(apartment: Apartment) : Observable<Apartment>
    {
        return this.http.post<Apartment>(this.apiURL, apartment, this.httpOptions);
    }
    // TODO: validate my apartment
    updateApartment(apartment: Apartment): Observable<Apartment> 
    {
        console.log(apartment);
        const url = `${this.apiURL}/${apartment._id}`;
        apartment._id=undefined;
        return this.http.put<Apartment>(url, apartment, this.httpOptions);
    }

    // TODO: validate my apartment
    deleteApartment(apartment: Apartment): Observable<Apartment>
    {  
        const url = `${this.apiURL}/${apartment._id}`;
        return this.http.delete<Apartment>(url);
    }
}