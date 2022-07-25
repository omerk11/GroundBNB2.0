import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Apartment } from '../apartment.model';
import { ApartmentsService } from '../apartments.service';

@Component({
  selector: 'app-apartment-edit',
  templateUrl: './apartment-edit.component.html',
  styleUrls: ['./apartment-edit.component.css']
})
export class ApartmentEditComponent
{
  @Input() apartment!: Apartment;
  @Output() onApartmentEdited = new EventEmitter(); 
  @Output() onDeleteApartment: EventEmitter<Apartment> = new EventEmitter(); 

  constructor(public apartmentsService:ApartmentsService)
  {
    // this will create a new property apartmentsService in this class
  }
  

  onSubmit(form:NgForm)
  {
    if(window.confirm("Are you sure you want to update?"))
    {
      if(form.invalid)
      {
        console.log("error");
        return;
      }
      this.apartmentsService.updateApartment(this.apartment).subscribe((apartment)=>this.onApartmentEdited.emit(null));
    }
  }

  onDelete()
  {
    if(window.confirm("Are you sure you want to delete?"))
    {
      this.apartmentsService.deleteApartment(this.apartment).subscribe((apartment)=>this.onDeleteApartment.emit(apartment));
    }//TODO: deleting doesnt refresh list
  }
}
