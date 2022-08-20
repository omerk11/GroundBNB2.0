import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApartmentsService } from '../apartments.service';

@Component({
  selector: 'app-apartment-search',
  templateUrl: './apartment-search.component.html',
  styleUrls: ['./apartment-search.component.scss']
})
export class ApartmentSearchComponent {
  @Output() onSearchQuery: EventEmitter<any> = new EventEmitter();
  @Output() searchedDates: EventEmitter<object> = new EventEmitter();

  constructor(public apartmentsService: ApartmentsService) { }

  onSubmit(form: NgForm | null) {
    let query: any = {};

    if (form == null) {
      this.onSearchQuery.emit(null);
      return;
    }

    if (form.invalid) {
      return;
    }

    if (form.value.startdate != "") {
      query.startdate = form.value.startdate;
    }
    if (form.value.enddate != "") {
      query.enddate = form.value.enddate
    }
    if (form.value.city != "") {
      query.city = form.value.city;
    }
    if (form.value.maxprice != "") {
      query.maxprice = form.value.maxprice;
    }
    if (form.value.minvisitors != "") {
      query.minvisitors = form.value.minvisitors;
    }
    if (form.value.description != "") {
      query.description = form.value.description;
    }
    this.onSearchQuery.emit(query);

    if (form.value.startdate && form.value.enddate) {
      this.searchedDates.emit({
        startdate: form.value.startdate,
        enddate: form.value.enddate
      });
    }
  }
}
