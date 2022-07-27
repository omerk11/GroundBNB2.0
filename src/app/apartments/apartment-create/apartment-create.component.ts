import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
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