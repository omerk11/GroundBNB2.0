import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApartmentsService } from 'src/app/apartments/apartments.service';
import { AuthService } from 'src/app/users/auth.service';
import { Reservation } from '../reservation.model';
import { ReservationsService } from '../reservations.service';

@Component({
  selector: 'app-reservation-item',
  templateUrl: './reservation-item.component.html',
  styleUrls: ['./reservation-item.component.css']
})
export class ReservationItemComponent implements OnInit
{
  @Input() reservation!: Reservation;
  @Input() allowEdit: boolean = false;
  apartmentName: string = "Loading Apartment Name...";
  apartmentOwner: string = "Loading Owner Name...";

  constructor(public apartmentsService: ApartmentsService, public reservationsService: ReservationsService, private authService: AuthService) 
  {
    
  }

  ngOnInit(): void 
  {
    this.apartmentsService.getApartmentById(this.reservation.apartmentid).subscribe(
      (apartment) => 
      {
        this.apartmentName = apartment.name;

        this.authService.getUserById(apartment.ownerid).subscribe(
          (user)=>
          { 
            this.apartmentOwner = user.firstname +" "+ user.lastname;
          });
      });
  }

  onSubmit(form:NgForm)
  {
    if(window.confirm("Are you sure you want to update?"))
    {
      if(form.invalid)
      {
        console.log("error");
        return;
      }
      this.reservationsService.updateReservation(this.reservation).subscribe((res)=>this.reservation = res);
    }
  }

  onDelete()
  {
    if(window.confirm("Are you sure you want to delete?"))
    {
      this.reservationsService.deleteReservation(this.reservation).subscribe();
    }//TODO: deleting doesnt refresh list
  }
  
}
