import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Page } from '../models/page.enum';
// import { UsersService } from '../users/users.service';
import {AuthService} from '../users/auth.service'
import { TokenStorageService } from '../users/token-storage.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent
{
  @Output() onPageChange: EventEmitter<Page> = new EventEmitter();
  constructor( public authService:AuthService, public tokenService:TokenStorageService) { }
  
  // Display Page Functions
  displayApartmentsPage()
  {
    this.onPageChange.emit(Page.ApartmentsList);
  }

  displayReservationsPage()
  {
    this.onPageChange.emit(Page.ReservationsList);
  }

  displayAdminPage()
  {
    this.onPageChange.emit(Page.AdminPage);
  }

  displaySignUpPage()
  {
    this.onPageChange.emit(Page.SignUp);
  }

  displayLoginsPage()
  {
    this.onPageChange.emit(Page.LogIn);
  }
  Logout(){

    this.authService.logOutUser().subscribe((user)=>this.onPageChange.emit(Page.LogIn));
  }

  displayAllUsersPage()
  {
    this.authService.getUsers().subscribe((user)=>this.onPageChange.emit(Page.UsersList));
  }
  displayMyApartmentsPage()
  {
    this.onPageChange.emit(Page.MyApartmentsList);
  }
  displayMyReservationsPage()
  {
    this.onPageChange.emit(Page.MyReservationsList);
  }

  displayUserEditPage()
  {
    this.onPageChange.emit(Page.UserEdit);
  }

  // User Functions
  isLoggedIn()
  {
    return this.tokenService.isLoggedIn();
  }

  isAdmin()
  {
    return this.tokenService.isAdmin();
  }

  getName()
  {
    let user = this.tokenService.getUser();
    return user.firstname + " " + user.lastname;
  }

}
