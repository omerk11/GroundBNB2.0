import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReservationsService } from 'src/app/reservations/reservations.service';
import { Apartment } from '../apartment.model';
import { Reservation } from 'src/app/reservations/reservation.model';
import { ApartmentsService } from '../apartments.service';
import { TokenStorageService } from 'src/app/users/token-storage.service';

@Component({
  selector: 'app-apartment-item',
  templateUrl: './apartment-item.component.html',
  styleUrls: ['./apartment-item.component.css']
})
export class ApartmentItemComponent  
{
  
  @Input() apartment!: Apartment;
  @Input() searchedDates!: any;
  @Input() allowEdit: boolean = false;
  @Output() onDeleteApartment: EventEmitter<Apartment> = new EventEmitter();


  constructor(public apartmentsService: ApartmentsService,public reservationsService: ReservationsService, private tokenStorage: TokenStorageService) 
  {

  }
  
  addReservation()
  {
    if(this.searchedDates && this.apartment._id)
    {
      const newReservation: Reservation = 
      {
        apartmentid:this.apartment._id,
        ownerid: this.apartment.ownerid,
        buyerid: this.tokenStorage.getMyId(),
        startdate:this.searchedDates.startdate,
        enddate:this.searchedDates.enddate,
      }
      this.reservationsService.addReservation(newReservation).subscribe();
    }
  }

  onDelete()
  {
    this.onDeleteApartment.emit(this.apartment);
  }

}
