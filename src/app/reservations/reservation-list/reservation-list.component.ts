import { Component, OnInit } from '@angular/core';
import { Reservation } from '../reservation.model';
import { ReservationsService } from '../reservations.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit
{

  reservations: Reservation[] = [];

  constructor(public reservationsService:ReservationsService)// this will create a new property ReservationsService in this class
  {
  }

  ngOnInit(): void 
  {
    this.refreshList();
  }

  refreshList(params?: string)
  {
    this.reservationsService.getReservations(params)
      .subscribe((reservations)=>{this.reservations = reservations;});
  }

  removeReservationFromList(reservation: Reservation)
  {
    this.reservations = this.reservations.filter((res) => reservation._id !== res._id);
  }
  

}

// reservations: Reservation[] = [
//   {
//       appartmentId:"-1",
//       ownerId:"-1",
//       buyerId:"-1",
//       startdate:new Date(),
//       endDate:new Date(),
//       review:"no room service",
//       rating:1
//   },
//   {
//     appartmentId:"-1",
//     ownerId:"-1",
//     buyerId:"-1",
//     startdate:new Date(),
//     endDate:new Date(),
//     review:"no room service",
//     rating:1
//   }
// ];