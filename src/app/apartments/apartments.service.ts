import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";//added manualy

import { Apartment } from "./apartment.model";
import { HttpRequestModel } from "../models/http-request-model";
@Injectable({ providedIn: "root" })
export class ApartmentsService {
    private readonly API_URL = "http://localhost:3000/api/apartments";
    private apartments: Apartment[] = [];
    private apartmentsUpdated = new Subject<Apartment[]>();

    constructor(private http: HttpClient) {

    }
    
    getApartments() {
        const params = new HttpParams().append('type', 'getAllApartments');
        return this.http.get<HttpRequestModel<Apartment[]>>(this.API_URL);
    }

    getApartmentById(id :string){
        const params = new HttpParams().append('type', 'getAllApartments').append('id',id);
        return this.http.get<HttpRequestModel<Apartment[]>>(this.API_URL, { params });
    }

    addApartment(name: string,
        description: string,
        city: string,
        address: string,
        price: number,
        maxvisitors: number,
        images: string[],
        ownerid: string,
        reservations: string[]) {
        const newAp = // create new ap from params
        {
            id: "-1",//TODO: edit
            name: name,
            description: description,
            city: city,
            address: address,
            price: price,
            maxvisitors: maxvisitors,
            images: images,
            ownerid: ownerid,
            reservations: reservations
        };
        const params = new HttpParams();
        params.append('type', 'addApartment');
        // params.append('element',newAp.toString());
        return this.http.post<Apartment>(this.API_URL,params);

        // this.apartments.push(newAp);// push the ap to the array
        // this.apartmentsUpdated.next([...this.apartments]);// observer update because of new ap

    }
}