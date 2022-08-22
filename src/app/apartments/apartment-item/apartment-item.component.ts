import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ReservationsService } from 'src/app/reservations/reservations.service';
import { Apartment } from '../apartment.model';
import { Reservation } from 'src/app/reservations/reservation.model';
import { ApartmentsService } from '../apartments.service';
import { TokenStorageService } from 'src/app/users/token-storage.service';
import { NotificationsService } from 'angular2-notifications';
import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { timeInterval } from 'rxjs';


@Component({
  selector: 'app-apartment-item',
  templateUrl: './apartment-item.component.html',
  styleUrls: ['./apartment-item.component.scss']
})
export class ApartmentItemComponent implements OnInit {
  @Input() apartment!: Apartment;
  @Input() searchedDates!: any;
  @Input() allowEdit: boolean = false;
  @Input() googleGeocoder!: any;
  @Output() onDeleteApartment: EventEmitter<string> = new EventEmitter();
  @Output() onReservationsAdded: EventEmitter<string> = new EventEmitter();

  coordinates: { lat: number, lng: number } | null = null;
  renderImage: boolean = true;
  isReserving: boolean = false;
  map!: any;

  constructor(
    public apartmentsService: ApartmentsService,
    public reservationsService: ReservationsService,
    private tokenStorage: TokenStorageService,
    private notificationsService: NotificationsService
  ) { }


  ngOnInit() {
    this.codeAddress();

  }

  addReservation() {
    if (this.searchedDates && this.apartment._id && !this.isReserving) {
      this.isReserving = true;
      this.reservationsService.addReservation({
        apartmentid: this.apartment._id,
        ownerid: this.apartment.ownerid,
        buyerid: this.tokenStorage.getMyId(),
        startdate: this.searchedDates.startdate,
        enddate: this.searchedDates.enddate,
      } as Reservation).subscribe((msg:any)=>{
        if(msg.error)
        {
          this.notificationsService.error('Error', msg.error);

        }
        else{
          this.notificationsService.success('Reservation added', 'Reservation has been added', { timeOut: 3000, showProgressBar: true , animate: 'fade' , position:['bottom','right']});
          this.onReservationsAdded.emit(this.apartment._id);
        }
        this.isReserving = false;
      });
      }
  }

  onDelete() {
    this.onDeleteApartment.emit(this.apartment._id);
    
  }

  codeAddress() {
    const address = (this.apartment.address + '+' + this.apartment.city).replace(" ", "+");
    this.googleGeocoder.geocode({ 'address': address }, (results: any, status: any) => {
      if (status == 'OK') {
        this.coordinates = { lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() };
      } else {
        setTimeout(this.codeAddress,1000);
        console.error('Geocode was not successful for the following reason: ' + status);
      }
    });
  }
  isInViewport(element: HTMLElement) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
}