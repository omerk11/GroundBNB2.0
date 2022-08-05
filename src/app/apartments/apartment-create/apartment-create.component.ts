import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TokenStorageService } from 'src/app/users/token-storage.service';
import { Apartment } from '../apartment.model';
import { ApartmentsService } from '../apartments.service';

@Component({
  selector: 'app-apartment-create',
  templateUrl: './apartment-create.component.html',
  styleUrls: ['./apartment-create.component.css']
})
export class ApartmentCreateComponent
{
  
  @Output() onApartmentAdded = new EventEmitter();

  show: boolean = false;
  
  constructor(public apartmentsService:ApartmentsService, private tokenStorage: TokenStorageService)
  {
    // this will create a new property apartmentsService in this class
  }

  onSubmit(form:NgForm)
  {
    if(form.invalid)
    {
      console.log("error");
      return;
    }
    const new_apartment: Apartment=
    {
      name:form.value.name,
      description:form.value.description,
      city:form.value.city,
      address:form.value.address,
      price:form.value.price,
      maxvisitors:form.value.maxvisitors,
      images:[],
      ownerid:this.tokenStorage.getMyId(),
      reservations:[]
    }
    this.apartmentsService.addApartment(new_apartment).subscribe((apartment)=>this.onApartmentAdded.emit(null));
  }
}