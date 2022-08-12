import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  showSearch: boolean = false;

  constructor(
    public apartmentsService: ApartmentsService, private authService: AuthService,
    public reservationsService: ReservationsService)// this will create a new property ReservationsService in this class
  {
  }

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList(query?: any) {
    if (this.isMyReservations) 
    {
      this.reservationsService.getReservationsByBuyerId(query)
        .pipe(switchMap(res => this.createResView(res))).subscribe((reservations) => { this.reservations = reservations; });
    } 
    else if (this.isForMyApartments) 
    {
      this.reservationsService.getReservationsByOwnerId(query)
        .pipe(switchMap(res => this.createResView(res))).subscribe((reservations) => { this.reservations = reservations; });
    } 
    else 
    {
      this.reservationsService.getReservations(query)
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
          tap(apartment => {
            re.apartment = apartment;
            // calc price
            const timeDifference = new Date(re.enddate).getTime() - new Date(re.startdate).getTime();
            const daysDifference = timeDifference / (1000 * 3600 * 24);
            re.totalprice = re.apartment.price * daysDifference;
            this.authService.getUserById(re.buyerid).subscribe(buyer => re.buyer = buyer);
          }),
          exhaustMap(apartment => this.authService.getUserById(apartment.ownerid))
        ).subscribe(user => re.owner = user);
        
        
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

  onSearch(form:NgForm)
    {
      let query: any = {};
      if(form.invalid)
      {
        console.log("error");
        return;
      }
      if(form.value.date != "")
      {
        query.date = form.value.date;
      }
      if(form.value.apartmentname != "")
      {
        query.apartmentname = form.value.apartmentname;
      }
      if(form.value.city != "")
      {
        query.city = form.value.city;
      }
      
      this.refreshList(query);
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