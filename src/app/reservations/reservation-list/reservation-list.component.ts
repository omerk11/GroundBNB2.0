import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { of, switchMap } from 'rxjs';
import { ApartmentsService } from 'src/app/apartments/apartments.service';
import { AuthService } from 'src/app/users/auth.service';
import { TokenStorageService } from 'src/app/users/token-storage.service';
import { Reservation, ReservationView } from '../reservation.model';
import { ReservationsService } from '../reservations.service';


@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.scss']
})
export class ReservationListComponent implements OnInit {
  @Input() isMyReservations: boolean = false;
  @Input() isForMyApartments: boolean = false;
  reservations: ReservationView[] = [];
  showSearch: boolean = false;
  displayedColumns: string[] = [];

  constructor(
    private readonly tokenStorage: TokenStorageService,
    public apartmentsService: ApartmentsService, private authService: AuthService,
    public reservationsService: ReservationsService)// this will create a new property ReservationsService in this class
  { }

  totalSpendings: number = 0;

  ngOnInit(): void {

    if (this.isForMyApartments) {
      this.displayedColumns = ['details', "customer", 'startdate', 'enddate', 'priceperday', "review", "rating"];
    } else {
      if (this.isMyReservations) {
        this.displayedColumns = ['details', "owner", 'startdate', 'enddate', 'priceperday', "review", "rating", "actions"];
      } else {
        this.displayedColumns = ['details', 'startdate', 'enddate', 'priceperday', "review", "rating", "actions"];
      }
    }

    // if (!this.isForMyApartments) {
    //   this.displayedColumns = ['details', "owner", 'startdate', 'enddate', 'priceperday', "review", "rating"];
    // } else {
    //   if (!this.isMyReservations) {
    //     this.displayedColumns = ['details', "customer", 'startdate', 'enddate', 'priceperday', "review", "rating"];
    //   } else {
    //     this.displayedColumns = ['details', 'startdate', 'enddate', 'priceperday', "review", "rating", "actions"];
    //   }
    // }
    // this.reservationsService.getTotalSpendings().subscribe((data) => this.totalSpendings = data.result);
  
    this.refreshList();
  }

  refreshList(query: any = {}) {
    if (this.isMyReservations) {
      query = {
        ...query,
        buyerid: this.tokenStorage.getMyId()
      }
    } else if (this.isForMyApartments) {
      query = {
        ...query,
        ownerid: this.tokenStorage.getMyId()
      }
    }

    this.reservationsService.getReservation(query)
      .pipe(switchMap(reservations => {
        return of(reservations.reduce((list, item) => {
          if (item.apartment) {
            const timeDifference = new Date(item.enddate).getTime() - new Date(item.startdate).getTime();
            const daysDifference = timeDifference / (1000 * 3600 * 24);
            item.totalprice = item.apartment.price * daysDifference;
            list.push(item);
          }
          return list;
        }, new Array<ReservationView>()));
      }))
      .subscribe(reservations => {this.reservations = reservations;});
  }

  removeReservationFromList(reservation: Reservation) {
    this.reservations = this.reservations.filter((res) => reservation._id !== res._id);
  }

  onEdit(reservation: Reservation) {
    if (window.confirm("Are you sure you want to update?")) {
      this.reservationsService.updateReservation(reservation as ReservationView).subscribe();
    }
  }

  onDelete(reservation: Reservation) {
    if (window.confirm("Are you sure you want to delete?")) {
      this.reservationsService.deleteReservation(reservation).subscribe(() => {
        this.removeReservationFromList(reservation);
      });
    }
  }

  onSearch(form: NgForm) {
    let query: any = {};
    if (form.invalid) {
      console.log("error");
      return;
    }
    if (form.value.date != "") {
      query.startdate = form.value.date;
    }
    if (form.value.apartmentname != "") {
      query.apartmentName = form.value.apartmentname;
    }
    if (form.value.city != "") {
      query.city = form.value.city;
    }

    this.refreshList(query);
  }

}
