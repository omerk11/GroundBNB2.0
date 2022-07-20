import { Component } from '@angular/core';
import { Apartment } from "./apartments/apartment.model"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  storedApartments:Apartment[]=[];
  
  onApartmentAdded(apartment:Apartment)
  {
    this.storedApartments.push(apartment)
  }

}
