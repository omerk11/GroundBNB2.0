import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpRequestModel } from 'src/app/models/http-request-model';
import { Apartment } from '../apartment.model';
import { ApartmentsService } from '../apartments.service';

@Component({
  selector: 'app-apartment-list',
  templateUrl: './apartment-list.component.html',
  styleUrls: ['./apartment-list.component.css']
})
export class ApartmentListComponent implements OnInit, OnDestroy {
  apartments: Apartment[] = [];
  private apartmentsSub!: Subscription;

  constructor(public apartmentsService: ApartmentsService) {
    // this will create a new property apartmentsService in this class
  }

  ngOnInit(): void {// when ap-list is created
    this.apartmentsService.getApartments()
          .subscribe((res: HttpRequestModel<Apartment[]>) => this.apartments = res.data);
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
