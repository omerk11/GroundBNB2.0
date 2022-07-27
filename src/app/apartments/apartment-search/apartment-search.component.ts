import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-apartment-search',
  templateUrl: './apartment-search.component.html',
  styleUrls: ['./apartment-search.component.css']
})
export class ApartmentSearchComponent {

  @Output() onApartmentAdded: EventEmitter<string> = new EventEmitter(); 

  show: boolean = false;

  onSubmit(form:NgForm)
  {
    let params: string = "?";

    if(form.invalid)
    {
      console.log("error");
      return;
    }
    if(form.name != "")
    {
      params += "name="+form.name+"&";
    }
    
  }

}
