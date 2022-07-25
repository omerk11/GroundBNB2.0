import { Component } from '@angular/core';
import { Apartment } from "./apartments/apartment.model"
import { Page } from './models/page.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  
{
  page: Page = Page.ApartmentsList;
  addApartment: boolean = false;
}
