import { Apartment } from "../apartments/apartment.model";
import { User } from "../users/user.model";

export interface Reservation {
    _id?: string;
    apartmentid: string,
    ownerid: string,
    buyerid: string,
    startdate: Date,
    enddate: Date,
    review?: string,
    rating?: number
}

export interface ReservationView extends Reservation {
    apartment: Apartment;
    owner: User;
    customer: User;
    totalprice: number;
 }

export interface ReservationsPerDay {
    date: string;
    reservationsCount: string ;
}