import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";//added manualy

import { Reservation } from "./reservation.model";

@Injectable({providedIn:"root"})

export class ReservationsService
{
    apiURL = "http://localhost:3000/api/Reservations";// Reservations api url

    httpOptions = // http options?
    {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    constructor(private http:HttpClient)
    {
    }

    getReservations() :Observable<Reservation[]>
    {
        return this.http.get<Reservation[]>(this.apiURL);// requesst all Reservations from app
    }

    addApartment(reservation: Reservation) : Observable<Reservation>
    {
        return this.http.post<Reservation>(this.apiURL, reservation, this.httpOptions);
    }
    // TODO: validate my reservation
    updateApartment(reservation: Reservation): Observable<Reservation> 
    {
        console.log(reservation);
        const url = `${this.apiURL}/${reservation._id}`;
        reservation._id=undefined;
        return this.http.put<Reservation>(url, reservation, this.httpOptions);
    }

    // TODO: validate my reservation
    deleteApartment(reservation: Reservation): Observable<Reservation>
    {  
        const url = `${this.apiURL}/${reservation._id}`;
        return this.http.delete<Reservation>(url);
    }
}