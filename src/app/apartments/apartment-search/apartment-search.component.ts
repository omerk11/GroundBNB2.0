import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApartmentsService } from '../apartments.service';
// import { MatDateRangeInput } from '@angular/material/datepicker';
// import { MatDateRangePicker } from '@angular/material/datepicker';


@Component({
  selector: 'app-apartment-search',
  templateUrl: './apartment-search.component.html',
  styleUrls: ['./apartment-search.component.css']
})
export class ApartmentSearchComponent {

  @Output() onSearchQuery: EventEmitter<string> = new EventEmitter(); 

  show: boolean = false;

  constructor(public apartmentsService:ApartmentsService)
  {
    // this will create a new property apartmentsService in this class
  }

  onSubmit(form:NgForm)
  {
    let params: string = "?";

    if(form.invalid)
    {
      console.log("error");
      return;
    }
    if(form.value.startDate != "")
    {
      params += "startDate="+form.value.startDate +"&";
    }
    if(form.value.endDate != "")
    {
      params += "endDate="+form.value.endDate +"&";
    }
    if(form.value.name != "")
    {
      params += "name="+form.value.name +"&";
    }
    if(form.value.city != "")
    {
      params += "city="+form.value.city +"&";
    }
    if(form.value.address != "")
    {
      params += "address="+form.value.address +"&";
    }
    if(form.value.maxprice != "")
    {
      params += "maxprice="+form.value.maxprice +"&";
    }
    if(form.value.minvisitors != "")
    {
      params += "minvisitors="+form.value.minvisitors+"&";
    }

    params = params.substring(0,params.length - 1);
    
    this.onSearchQuery.emit(params);
  }

}
