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
  constructor(public apartmentsService:ApartmentsService)
  {
    // this will create a new property apartmentsService in this class
  }

  onAddApartment(form:NgForm)
  {
    if(form.invalid)
    {
      return;
    }
    this.apartmentsService.addApartment(
    form.value.name,
    form.value.description,
    form.value.city,
    form.value.address,
    form.value.price,
    form.value.maxvisitors,
    [],
    "-1",
    [])
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