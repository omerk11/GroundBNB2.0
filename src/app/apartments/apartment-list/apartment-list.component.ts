import { Component, Input, OnInit } from '@angular/core';
import { Apartment } from '../apartment.model';

@Component({
  selector: 'app-apartment-list',
  templateUrl: './apartment-list.component.html',
  styleUrls: ['./apartment-list.component.css']
})
export class ApartmentListComponent 
{
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
  @Input() apartments:Apartment[]=[];
}
