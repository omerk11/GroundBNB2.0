export interface Apartment{
    _id?:string;
    name:string;
    description:string;
    city:string;
    address:string;
    price:number;
    maxvisitors:number;
    images:string[];
    ownerid:string;
    reservations:string[];//TODO: change to reservations model
}