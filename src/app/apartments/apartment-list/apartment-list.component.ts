import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apartment } from '../apartment.model';
import { ApartmentsService } from '../apartments.service';

@Component({
  selector: 'app-apartment-list',
  templateUrl: './apartment-list.component.html',
  styleUrls: ['./apartment-list.component.css']
})
export class ApartmentListComponent implements OnInit, OnDestroy
{
  apartments: Apartment[] = [];
  private apartmentsSub!: Subscription;

  constructor(public apartmentsService:ApartmentsService)
  {
    // this will create a new property apartmentsService in this class
  }

  ngOnInit(): void 
  {// when ap-list is created
    this.apartments = this.apartmentsService.getApartments();// get all aps
    this.apartmentsSub = this.apartmentsService.getApartmentUpdateListener()// add the list as a observer of ap.service
    .subscribe((apartments: Apartment[])=>//on ap.service updating, update apartments list
    {
      this.apartments =  apartments;
    });
  }
  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}

// apartments = [
  //   {
  //     name:"hatira shel habanim",
  //     description:"hatira of lord abba",
  //     city:"Rishon LeZion",
  //     address:"Harashba 10",
  //     price:"39",
  //     maxvisitors:"2"
  //   },
  //   {
  //     name:"The kingdon of evil shel savta",
  //     description:"mi maspik amitz laharog et savato shelo",
  //     city:"Rishon LeZion",
  //     address:"HaNagid 9",
  //     price:"39",
  //     maxvisitors:"2"
  //   }
  // ];
