import { ElementRef } from '@angular/core';
import { Component, ViewChild, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Loader } from '@googlemaps/js-api-loader';
import { Apartment } from '../apartment.model';
import { ApartmentsService } from '../apartments.service';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
declare var require: any
let AhoCorasick = require('ahocorasick');

@Component({
  selector: 'app-apartment-list',
  templateUrl: './apartment-list.component.html',
  styleUrls: ['./apartment-list.component.scss']
})
export class ApartmentListComponent implements OnInit, OnDestroy {
  @Input() isMyApartments: boolean = false;

  apartments: Apartment[] = [];
  searchedDates!: object;
  sortOrder: string = "rating_desc";
  prevQuery!: any;

  googleLoder: Loader = new Loader({ apiKey: "AIzaSyBIzBq78AMY7ALjM6v0fN7Kgw3b8j-N31g" });
  googleGeocoder: any;

  isLoading: boolean = true;
  displaySearch: boolean = false;
  webSocket!: WebSocketSubject<unknown>;

  constructor(public apartmentsService: ApartmentsService) {
    this.googleLoder.load().then(() => this.googleGeocoder = new google.maps.Geocoder());
  }

  ngOnInit(): void {
    this.refreshList();
    this.webSocket = webSocket('ws://localhost:8080');

    this.webSocket.subscribe({
      next: (msg: any) => {
        const data = JSON.parse(msg);
        this.removeApartmentFromList(data.apartmentId, true);
        console.log('message received: ' + msg);
      }, // Called whenever there is a message from the server.
      error: err => console.log(err), // Called if at any point WebSocket API signals some kind of error.
      complete: () => console.log('complete') // Called when connection is closed (for whatever reason).
     });
  }

  ngOnDestroy(): void {
    this.webSocket && this.webSocket.complete(); // Closes the connection.
  }

  refreshList(query?: any) {
    this.isLoading = true;
    this.apartments = [];
    if (this.isMyApartments) {
      this.apartmentsService.getApartmentsByOwnerId().subscribe((apartments) => {
        this.apartments = apartments;
        this.isLoading = false;
      });
      return;
    }

    if (query) {
      query.sortorder = this.sortOrder;
      this.prevQuery = query;
    } else if (this.prevQuery) {
      query = this.prevQuery;
    } else {
      query = { sortorder: this.sortOrder };
    }

    let runAc: boolean;
    let acList: string[];

    if (query.description) {
      acList = query.description.toLowerCase().split(",");
      delete query.description;
      runAc = true;
    } else {
      runAc = false;
    }

    this.apartmentsService.getApartments(query).subscribe(apartments => {
      this.apartments = apartments.filter(ap => !runAc || this.ahocorasick(acList, ap.description + " " + ap.name));
      this.isLoading = false;
    });
  }

  ahocorasick(keywords: string[], search: string): boolean {
    const ac = new AhoCorasick(keywords);
    const res = ac.search(search.toLowerCase());
    return res.length > 0;
  }

  removeApartmentFromList(id: string, fromWebSocket: boolean = false) {
    if(!this.apartments.find(k => k._id === id)) return;
    if(!fromWebSocket)  {
      this.webSocket.next({ apartmentId: id });
    }
    this.apartments = [...this.apartments.filter((ap) => id !== ap._id)];
  }

  sortApartments(sort: string) {
    switch (sort) {
      case "price":
        sort = this.sortOrder == "price" ? "price_desc" : "price";
        break;

      case "guests":
        sort = this.sortOrder == "maxvisitors" ? "maxvisitors_desc" : "maxvisitors";
        break;

      case "rating":
        sort = this.sortOrder == "rating" ? "rating_desc" : "rating";
        break;
    }
    this.sortOrder = sort;

    this.refreshList();
  }
}
