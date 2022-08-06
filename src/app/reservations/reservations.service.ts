import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";//added manualy

import { Reservation } from "./reservation.model";
import { TokenStorageService } from "../users/token-storage.service";

@Injectable({providedIn:"root"})

export class ReservationsService
{
    apiURL = "http://localhost:3000/api/reservations";// Reservations api url

    httpOptions = // http options?
    {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    constructor(private http:HttpClient, private tokenStorage: TokenStorageService)
    {
    }

    getReservations(params?: string) :Observable<Reservation[]>
    {
        console.log
        if(!params)
        {
            params = "";
        }
        return this.http.get<Reservation[]>(this.apiURL + params);// requesst all Reservations from app
    }

    getReservationsByBuyerId() :Observable<Reservation[]>
    {
        let id = this.tokenStorage.getMyId();
        const url = `${this.apiURL}/getreservationsbybuyerid/${id}`;
        return this.http.get<Reservation[]>(url);
    }

    getReservationsByOwnerId() :Observable<Reservation[]>
    {
        let id = this.tokenStorage.getMyId();
        const url = `${this.apiURL}/getreservationsbyownerid/${id}`;
        return this.http.get<Reservation[]>(url);
    }

    addReservation(reservation: Reservation) : Observable<Reservation>
    {
        return this.http.post<Reservation>(this.apiURL+"/add", reservation, this.httpOptions);
    }
    // TODO: validate my reservation
    updateReservation(reservation: Reservation): Observable<Reservation> 
    {
        console.log(reservation);
        const url = `${this.apiURL}/update/${reservation._id}`;
        return this.http.put<Reservation>(url, reservation, this.httpOptions);
    }

    // TODO: validate my reservation
    deleteReservation(reservation: Reservation): Observable<Reservation>
    {  
        const url = `${this.apiURL}/delete/${reservation._id}`;
        return this.http.delete<Reservation>(url);
    }
}