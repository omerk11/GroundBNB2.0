import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Apartment } from '../apartment.model';
import { ApartmentsService } from '../apartments.service';

@Component({
  selector: 'app-apartment-item',
  templateUrl: './apartment-item.component.html',
  styleUrls: ['./apartment-item.component.css']
})
export class ApartmentItemComponent {

  constructor(public apartmentsService: ApartmentsService) { }

  @Input() apartment!: Apartment;
  @Output() onDeleteApartment: EventEmitter<Apartment> = new EventEmitter(); 

  onDelete()
  {
    this.onDeleteApartment.emit(this.apartment);
  }

}
