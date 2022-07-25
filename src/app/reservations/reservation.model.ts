export interface Reservation{
    _id?:string;
    appartmentId:string,
    ownerId:string,
    buyerId:string,
    startdate:Date,
    endDate:Date,
    review:string,
    rating:number
}

    