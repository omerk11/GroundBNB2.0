import { Component, OnInit } from '@angular/core';
import { Reservation } from '../reservation.model';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent
{

  reservations: Reservation[] = [
    {
        appartmentId:"-1",
        ownerId:"-1",
        buyerId:"-1",
        startdate:new Date(),
        endDate:new Date(),
        review:"no room service",
        rating:1
    }

  ];

}
