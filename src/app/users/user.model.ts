import { Apartment } from "../apartments/apartment.model";

export interface User{
    _id?:string;
    firstname:string;
    lastname:string;
    password:string;
    email:string;
    phone:string;
    apartments:Apartment[];
    reservations:[];//TODO: change to reservations model
    roles:string[];
}