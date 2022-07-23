import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpRequestModel } from 'src/app/models/http-request-model';
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
  
  constructor(public apartmentsService:ApartmentsService)
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
<<<<<<< HEAD
    this.apartmentsService.addApartment(
    form.value.name,
    form.value.description,
    form.value.city,
    form.value.address,
    form.value.price,
    form.value.maxvisitors,
    [],
    "-1",
    []).subscribe((res: Apartment) => console.log('added'));
=======
    const new_apartment: Apartment=
    {
      name:form.value.name,
      description:form.value.description,
      city:form.value.city,
      address:form.value.address,
      price:form.value.price,
      maxvisitors:form.value.maxvisitors,
      images:[],
      ownerid:"-1",
      reservations:[]
    }
    this.apartmentsService.addApartment(new_apartment).subscribe((apartment)=>this.onApartmentAdded.emit(null));
>>>>>>> main
  }
}

  // new apartment variabls
  // entered_id="-1";
  // entered_name="";
  // entered_description="";
  // entered_city="";
  // entered_address="";
  // entered_price=0;
  // entered_maxvisitors=0;
  // entered_images=[];
  // entered_ownerid="-1";
  // entered_reservations=[];