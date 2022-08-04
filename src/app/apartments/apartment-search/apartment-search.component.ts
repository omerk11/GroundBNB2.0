import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApartmentsService } from '../apartments.service';


@Component({
  selector: 'app-apartment-search',
  templateUrl: './apartment-search.component.html',
  styleUrls: ['./apartment-search.component.css']
})
export class ApartmentSearchComponent {

  @Output() onSearchQuery: EventEmitter<string> = new EventEmitter(); 
  @Output() searchedDates: EventEmitter<object> = new EventEmitter();

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
    console.log(form.value.startDate.getMonth());
    console.log(form.value.endDate);
    if(form.value.startDate != "")
    {
      let date: string = form.value.startDate.getDate() + "/";
      date += (form.value.startDate.getMonth()+1) + "/";
      date += form.value.startDate.getFullYear();
      params += "startDate="+ date +"&";
    }
    if(form.value.endDate != "")
    {
      let date: string = form.value.endDate.getDate() + "/";
      date += (form.value.endDate.getMonth()+1) + "/";
      date += form.value.endDate.getFullYear();
      params += "endDate="+ date +"&";
    }
    if(form.value.city != "")
    {
      params += "city="+form.value.city +"&";
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
    
    console.log(params);

    this.onSearchQuery.emit(params);
    if(form.value.startDate && form.value.endDate)
    {
      let dates = 
      {
        startDate: form.value.startDate,
        endDate: form.value.endDate
      }
      this.searchedDates.emit(dates);
    }
    
  }

}
