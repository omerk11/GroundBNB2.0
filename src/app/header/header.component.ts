import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Page } from '../models/page.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent
{
  @Output() onPageChange: EventEmitter<Page> = new EventEmitter();

  displayApartmentsPage()
  {
    this.onPageChange.emit(Page.ApartmentsList);
  }

  displayReservationsPage()
  {
    this.onPageChange.emit(Page.ReservationsList);
  }

  displayUsersPage()
  {
    this.onPageChange.emit(Page.UsersList);
  }
}
