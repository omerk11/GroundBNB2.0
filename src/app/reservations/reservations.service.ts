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

    getReservations(query?: any) :Observable<Reservation[]>
    {
        return this.http.get<Reservation[]>(this.apiURL);

        if(Object.keys(query).length>0)
        {
            return this.http.post<Reservation[]>(this.apiURL+"/getreservtionsbyquery",query,this.httpOptions);
        }
        else
        {
            return this.http.get<Reservation[]>(this.apiURL);// request all apartments from app
        }
    }

    getReservationsByBuyerId(query?: any) :Observable<Reservation[]>
    {
        let id = this.tokenStorage.getMyId();
        const url = `${this.apiURL}/getreservationsbybuyerid/${id}`;
        return this.http.get<Reservation[]>(url);
    }

    getReservationsByOwnerId(query?: any) :Observable<Reservation[]>
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