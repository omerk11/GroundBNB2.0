import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Apartment } from "./apartment.model";

@Injectable({providedIn:"root"})
export class ApartmentsService
{
    private apartments: Apartment[]=[];
    private apartmentsUpdated = new Subject<Apartment[]>();

    getApartments()
    {
        return [...this.apartments];
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
        id:"-1",    
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