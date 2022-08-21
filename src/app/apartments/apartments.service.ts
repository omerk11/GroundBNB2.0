import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";//added manualy

import { Apartment } from "./apartment.model";
import { TokenStorageService } from "../users/token-storage.service";

@Injectable({ providedIn: "root" })
export class ApartmentsService {

    apiURL = "http://localhost:3000/api/apartments";// apartments api url

    httpOptions = // http options?
        {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        };

    constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    }

    getApartments(query?: any): Observable<Apartment[]> {
        if (Object.keys(query).length > 0) {
            return this.http.post<Apartment[]>(this.apiURL + "/getapartmentsbyquery", query, this.httpOptions);
        }
        else {
            return this.http.get<Apartment[]>(this.apiURL);// request all apartments from app
        }
    }

    getApartmentById(id: string): Observable<Apartment> {
        const url = `${this.apiURL}/${id}`;
        return this.http.get<Apartment>(url);
    }

    getApartmentsByOwnerId(): Observable<Apartment[]> {
        let id = this.tokenStorage.getMyId();
        const url = `${this.apiURL}/getapartmentsbyownerid/${id}`;
        return this.http.get<Apartment[]>(url);
    }

    addApartment(apartment: Apartment): Observable<Apartment> {
        return this.http.post<Apartment>(this.apiURL + "/add", apartment, this.httpOptions);
    }
    // TODO: validate my apartment
    updateApartment(apartment: Apartment): Observable<Apartment> {
        const url = `${this.apiURL}/update/${apartment._id}`;
        return this.http.put<Apartment>(url, apartment, this.httpOptions);
    }

    // TODO: validate my apartment
    deleteApartment(apartment: Apartment) {
        const url = `${this.apiURL}/delete/${apartment._id}`;
        return this.http.delete(url);
    }
}