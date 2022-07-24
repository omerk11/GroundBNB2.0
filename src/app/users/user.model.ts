import { Apartment } from "../apartments/apartment.model";

export interface User{
    _id?:string;
    name:string;
    password:string;
    email:string;
    phone:string;
    apartments:Apartment[];
    reservations:[];//TODO: change to reservations model
    roles:String[];
}