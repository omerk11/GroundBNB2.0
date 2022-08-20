import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";//added manualy

import { Reservation, ReservationView } from "./reservation.model";
import { TokenStorageService } from "../users/token-storage.service";

@Injectable({ providedIn: "root" })

export class ReservationsService {
    apiURL = "http://localhost:3000/api/reservations";// Reservations api url

    httpOptions = // http options?
        {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
        };

    constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {
    }

    

    getReservation(query: any = {}): Observable<ReservationView[]> {
        const url = `${this.apiURL}/getreservationsbyquery`
        return this.http.post<ReservationView[]>(url, query);
    }

    // getAllReservations(query?: any): Observable<Reservation[]> {
    //     // Admin
    //     return this.http.get<Reservation[]>(this.apiURL);
    // }

    // getReservationsByBuyerId(query?: any): Observable<Reservation[]> {
    //     // const id = this.tokenStorage.getMyId();
    //     // const tmp = `${this.apiURL}/getreservationsbybuyerid/${id}`;
    //     // return this.http.get<Reservation[]>(tmp);
    //     //-----Enable This When Backend Works-----//
    //     if (query) {
    //         query.buyerid = this.tokenStorage.getMyId();
    //     }
    //     else {
    //         query = { buyerid: this.tokenStorage.getMyId() }
    //     }

    //     const url = `${this.apiURL}/getreservationsbyquery`;
    //     return this.http.post<Reservation[]>(url, query, this.httpOptions);

    // }

    // getReservationsByOwnerId(query?: any): Observable<Reservation[]> {
    //     // const id = this.tokenStorage.getMyId();
    //     // const url = `${this.apiURL}/getreservationsbyownerid/${id}`;
    //     // return this.http.get<Reservation[]>(url);
    //     //-----Enable This When Backend Works-----//
    //     if (query) {
    //         query.ownerid = this.tokenStorage.getMyId();
    //     }
    //     else {
    //         query = { ownerid: this.tokenStorage.getMyId() }
    //     }
    //     const postUrl = `${this.apiURL}/getreservationsbyquery`;
    //     return this.http.post<Reservation[]>(postUrl, query, this.httpOptions);

    // }

    addReservation(reservation: Reservation): Observable<Reservation> {
        return this.http.post<Reservation>(this.apiURL + "/add", reservation, this.httpOptions);
    }
    // TODO: validate my reservation
    updateReservation(reservation: ReservationView): Observable<Reservation> {

        const tmp = JSON.parse(JSON.stringify(reservation)) as any;
        delete tmp.apartment;
        delete tmp.owner;
        delete tmp.customer;
        delete tmp.totalprice;
        console.log(tmp);
        const url = `${this.apiURL}/update/${reservation._id}`;
        return this.http.put<Reservation>(url, tmp, this.httpOptions);
    }

    // TODO: validate my reservation
    deleteReservation(reservation: Reservation): Observable<Reservation> {
        const url = `${this.apiURL}/delete/${reservation._id}`;
        return this.http.delete<Reservation>(url);
    }
}