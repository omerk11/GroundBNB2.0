import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient,HttpHeaders, HttpParams } from "@angular/common/http";//added manualy

import { Apartment } from "./apartment.model";
const url ="http://localhost:3000/api/apartments";
@Injectable({providedIn:"root"})
export class ApartmentsService
{
    private apartments: Apartment[]=[];
    private apartmentsUpdated = new Subject<Apartment[]>();

    constructor(private http:HttpClient)
    {

    }

    getApartments()
    {
        //TODO: sync with backend apartment.service
        let my_headers = new HttpHeaders();
        my_headers.append('Content-Type', 'application/x-www-form-urlencoded');
        let params = new HttpParams();
        params.set('type','getAllApartments')

        this.http.get<{message:String, apartments:Apartment[]}>(url,{ headers : my_headers, params: params })// requesst all apartments from app
        .subscribe((data)=>// upon getting data
        {
            console.log('test');
            this.apartments = data.apartments;// update apartments arr
            this.apartmentsUpdated.next([...this.apartments]);// notify observers
        });
    }

    getApartmentUpdateListener()
    {
        return this.apartmentsUpdated.asObservable();
    }

    addApartment(name:string,
        description:string,
        city:string,
        address:string,
        price:number,
        maxvisitors:number,
        images:string[],
        ownerid:string,
        reservations:string[])
    {
        const newAp = // create new ap from params
        {
        id:"-1",//TODO: edit
        name:name,
        description:description,
        city:city,
        address:address,
        price:price,
        maxvisitors:maxvisitors,
        images:images,
        ownerid:ownerid,
        reservations:reservations
        };

        this.apartments.push(newAp);// push the ap to the array
        this.apartmentsUpdated.next([...this.apartments]);// observer update because of new ap

    }
}