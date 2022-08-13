import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReservationsService } from 'src/app/reservations/reservations.service';
import { Apartment } from '../apartment.model';
import { Reservation } from 'src/app/reservations/reservation.model';
import { ApartmentsService } from '../apartments.service';
import { TokenStorageService } from 'src/app/users/token-storage.service';
import { Loader } from "@googlemaps/js-api-loader"
import { HttpClient,HttpHeaders } from "@angular/common/http";//added manualy


@Component({
  selector: 'app-apartment-item',
  templateUrl: './apartment-item.component.html',
  styleUrls: ['./apartment-item.component.css']
})
export class ApartmentItemComponent implements OnInit
{
  
  @Input() apartment!: Apartment;
  @Input() searchedDates!: any;
  @Input() allowEdit: boolean = false;
  @Output() onDeleteApartment: EventEmitter<Apartment> = new EventEmitter();

  geocoder!:any;
  map!:any;
  tmpId = '';
  constructor(public apartmentsService: ApartmentsService,public reservationsService: ReservationsService, private tokenStorage: TokenStorageService,private http:HttpClient) 
  {

  }


  ngOnInit(){
    this.tmpId = this.apartment._id?'map-'+this.apartment._id:'';
    const loader = new Loader({
      apiKey: "AIzaSyBIzBq78AMY7ALjM6v0fN7Kgw3b8j-N31g",
    });
    loader.load().then(() => {
      this.initialize();
      this.codeAddress();
    });
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
  codeAddress() {
    let address = this.apartment.address + '+' + this.apartment.city;
    address = address.replace(" ", "+");
    this.geocoder.geocode( { 'address': address},(results:any, status:any) =>{
      if (status == 'OK') {
        this.map.setCenter(results[0].geometry.location);
        let marker = new google.maps.Marker({
            map: this.map,
            position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  initialize() {
    this.geocoder = new google.maps.Geocoder();
    let latlng = new google.maps.LatLng(-34.397, 150.644);
    let mapOptions = {
      zoom: 15,
      center: latlng
    }
    this.map = new google.maps.Map(document.getElementById(this.tmpId) as HTMLElement, mapOptions);
  }

}
