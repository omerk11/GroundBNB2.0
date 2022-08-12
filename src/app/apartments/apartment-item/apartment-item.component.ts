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
    console.log(this.tmpId);
    const loader = new Loader({
      apiKey: "AIzaSyBIzBq78AMY7ALjM6v0fN7Kgw3b8j-N31g",
    });
    loader.load().then(() => {
      this.initialize();
      this.codeAddress();
    });


    // const loader = new Loader({
    //   apiKey: "AIzaSyBIzBq78AMY7ALjM6v0fN7Kgw3b8j-N31g",
    // });
    // let map!:Map;
    // let  marker!:google.maps.Marker;
    // let address = this.apartment.city + '+' + this.apartment.address;
    // address = address.replace(" ", "+");
    // let service = new Geocoder();
    // service.geocode({ 'address': address}, function(results:any, status) {
    //   if (status == 'OK') {
    //     const latlang = results[0].geometry.location;
    //     loader.load().then(() => {
    //           // latlang = new google.maps.LatLng(31.9784515, 34.7760762)
    //           const options = {
    //             zoom: 13,
    //             center: latlang
    //         };
    //         map = new Map(document.getElementById('map') as HTMLElement, options);
    //         marker = new Marker({position: latlang, map: map});
    //         });
    //   } else {
    //     alert('Geocode was not successful for the following reason: ' + status);
    //   }
    // });
    // const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + address+ '&key=AIzaSyBIzBq78AMY7ALjM6v0fN7Kgw3b8j-N31g';
    // this.http.get<any>(url,this.httpOptions).subscribe(res=>{
    //   let lat, lng;
    //   lat = res.results[0].geometry.location.lat;
    //   lng = res.results[0].geometry.location.lng;
    //   const latlang = new google.maps.LatLng(lat, lng);
    //   console.log(latlang);
    //   loader.load().then(() => {
    //     // latlang = new google.maps.LatLng(31.9784515, 34.7760762)
    //     const options = {
    //       zoom: 13,
    //       center: latlang
    //   };
    //   this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, options);
    //   this.marker = new google.maps.Marker({position: latlang, map: this.map});
    //   });
    // });
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
