import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReservationsService } from 'src/app/reservations/reservations.service';
import { Apartment } from '../apartment.model';
import { Reservation } from 'src/app/reservations/reservation.model';
import { ApartmentsService } from '../apartments.service';

@Component({
  selector: 'app-apartment-item',
  templateUrl: './apartment-item.component.html',
  styleUrls: ['./apartment-item.component.css']
})
export class ApartmentItemComponent  
{
  
  @Input() apartment!: Apartment;
  @Output() onDeleteApartment: EventEmitter<Apartment> = new EventEmitter();
  @Input() searchedDates!: any;


  constructor(public apartmentsService: ApartmentsService,public reservationsService: ReservationsService) 
  {

  }
  
  addReservation()
  {
    if(this.searchedDates && this.apartment._id)
    {
      const newReservation: Reservation = 
      {
        appartmentId:this.apartment._id,
        ownerId: "-1",
        buyerId: "-1",
        startdate:this.searchedDates.startDate,
        endDate:this.searchedDates.endDate,
        review:"lama",
        rating:2
      }
      this.reservationsService.addReservation(newReservation).subscribe();
    }
  }

  onDelete()
  {
    this.onDeleteApartment.emit(this.apartment);
  }

}
