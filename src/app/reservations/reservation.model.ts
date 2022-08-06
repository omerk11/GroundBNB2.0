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
    apartmentName: string;
    apartmentOwner: string;
 }

