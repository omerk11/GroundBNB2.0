import { Component, OnInit } from '@angular/core';
import { ReservationsService } from 'src/app/reservations/reservations.service';

@Component({
  selector: 'app-user-reservations',
  templateUrl: './user-reservations.component.html',
  styleUrls: ['./user-reservations.component.scss']
})
export class UserReservationsComponent implements OnInit {

  constructor(public reservationsService: ReservationsService) { }
  ngOnInit(): void {
    
  }

}
