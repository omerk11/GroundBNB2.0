import { Component, Input, OnInit } from '@angular/core';
import { ApartmentsService } from 'src/app/apartments/apartments.service';
import { Reservation } from '../reservation.model';
import { ReservationsService } from '../reservations.service';

@Component({
  selector: 'app-reservation-item',
  templateUrl: './reservation-item.component.html',
  styleUrls: ['./reservation-item.component.css']
})
export class ReservationItemComponent implements OnInit
{
  @Input() reservation!: Reservation;
  apartmentName: string = "";

  constructor(public apartmentsService: ApartmentsService, public reservationsService: ReservationsService) 
  {
    
  }

  ngOnInit(): void 
  {
    this.apartmentsService.getApartmentById(this.reservation.appartmentId).subscribe(
      (apartment) => {this.apartmentName = apartment.name});
  }

}
