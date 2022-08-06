import { Component, Input, OnInit } from '@angular/core';
import { exhaustMap, forkJoin, of, switchMap, tap } from 'rxjs';
import { ApartmentsService } from 'src/app/apartments/apartments.service';
import { AuthService } from 'src/app/users/auth.service';
import { Reservation, ReservationView } from '../reservation.model';
import { ReservationsService } from '../reservations.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css']
})
export class ReservationListComponent implements OnInit {

  @Input() isMyReservations: boolean = false;
  @Input() isForMyApartments: boolean = false;
  reservations: ReservationView[] = [];


  constructor(
    public apartmentsService: ApartmentsService, private authService: AuthService,
    public reservationsService: ReservationsService)// this will create a new property ReservationsService in this class
  {
  }

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList(params?: string) {
    if (this.isMyReservations) {
      this.reservationsService.getReservationsByBuyerId()
        .pipe(switchMap(res => this.createResView(res))).subscribe((reservations) => { this.reservations = reservations; });
    } else if (this.isForMyApartments) {
      this.reservationsService.getReservationsByOwnerId()
        .pipe(switchMap(res => this.createResView(res))).subscribe((reservations) => { this.reservations = reservations; });
    } else {
      this.reservationsService.getReservations(params)
        .pipe(switchMap(res => this.createResView(res)))
        .subscribe((reservations) => { this.reservations = reservations; });
    }
  }

  createResView(res: Reservation[]) {
    const resView = res.map(r => {
      return r as ReservationView;
    });

    resView.forEach(re => {
      this.apartmentsService.getApartmentById(re.apartmentid)
        .pipe(
          tap(apartment => re.apartmentName = apartment.name),
          exhaustMap(apartment => this.authService.getUserById(apartment.ownerid))
        ).subscribe(user => re.apartmentOwner = user.firstname + " " + user.lastname);
    });

    return of(resView);
  }

  removeReservationFromList(reservation: Reservation) {
    this.reservations = this.reservations.filter((res) => reservation._id !== res._id);
  }

  onEdit(reservation: Reservation) {
    if (window.confirm("Are you sure you want to update?")) {
      this.reservationsService.updateReservation(reservation).subscribe();
    }
  }

  onDelete(reservation: Reservation) {
    if (window.confirm("Are you sure you want to delete?")) {
      this.reservationsService.deleteReservation(reservation).subscribe(() => {
        this.removeReservationFromList(reservation);
      });
    }


  }
}
// reservations: Reservation[] = [
//   {
//       appartmentId:"-1",
//       ownerId:"-1",
//       buyerId:"-1",
//       startdate:new Date(),
//       endDate:new Date(),
//       review:"no room service",
//       rating:1
//   },
//   {
//     appartmentId:"-1",
//     ownerId:"-1",
//     buyerId:"-1",
//     startdate:new Date(),
//     endDate:new Date(),
//     review:"no room service",
//     rating:1
//   }
// ];