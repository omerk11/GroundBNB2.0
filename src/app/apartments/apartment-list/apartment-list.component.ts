import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apartment } from '../apartment.model';
import { ApartmentsService } from '../apartments.service';

@Component({
  selector: 'app-apartment-list',
  templateUrl: './apartment-list.component.html',
  styleUrls: ['./apartment-list.component.css']
})
export class ApartmentListComponent implements OnInit
{
  apartments: Apartment[] = [];
  searchedDates!: object;
  sortOrder: string = "rating_desc";

  constructor(public apartmentsService:ApartmentsService)// this will create a new property apartmentsService in this class
  {
  }

  ngOnInit(): void 
  {// when apartment-list is created
    this.refreshList();
  }

  refreshList(params?: string)
  {
    if(params)
    {
      params += "&sort=" + this.sortOrder;
    }
    else{
      params = "?sort="+ this.sortOrder;
    }
    this.apartmentsService.getApartments(params)
      .subscribe((apartments)=>{this.apartments = apartments;});
  }

  removeApartmentFromList(apartment: Apartment)
  {
    this.apartments = this.apartments.filter((ap) => apartment._id !== ap._id);
  }

  sortApartments(sort: string)
  {
    switch(sort)
    {
    case "price":
      sort = this.sortOrder == "price" ? "price_desc" : "price";
      break;
    
    case "rooms":
      sort = this.sortOrder == "rooms" ? "rooms_desc" : "rooms";
      break;

    case "guests":
      sort = this.sortOrder == "guests" ? "guests_desc" : "guests";
      break;
    
    case "rating":
      sort = this.sortOrder == "rating" ? "rating_desc" : "rating";
      break;
    }
    this.sortOrder = sort;

    this.refreshList();
  }
}
