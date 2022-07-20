import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Apartment } from '../apartment.model';
@Component({
  selector: 'app-apartment-create',
  templateUrl: './apartment-create.component.html',
  styleUrls: ['./apartment-create.component.css']
})
export class ApartmentCreateComponent
{
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

  @Output() apartmentCreated = new EventEmitter<Apartment>();

  onAddApartment(form:NgForm)
  {
    if(form.invalid)
    {
      return;
    }
    const apartment:Apartment = 
    {
    id:"-1",
    name:form.value.name,
    description:form.value.description,
    city:form.value.city,
    address:form.value.address,
    price:form.value.price,
    maxvisitors:form.value.maxvisitors,
    images:[],
    ownerid:"-1",
    reservations:[]
    };
    this.apartmentCreated.emit(apartment);
  }

}
