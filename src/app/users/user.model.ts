import { Apartment } from "../apartments/apartment.model";

export interface User{
    _id?:string;
    name:string;
    password:string;
    email:string;
    phone:string;
    apartments:string[];
    reservations:string[];
    roles:string[];
}