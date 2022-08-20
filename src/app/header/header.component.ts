import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Page } from '../models/page.enum';
import { AuthService } from '../users/auth.service'
import { TokenStorageService } from '../users/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  currentUser: string = '';

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly tokenService: TokenStorageService) { }

  ngOnInit(): void {
    this.setUserStatuses();
  }

  logout() {
    this.authService.logOutUser().subscribe(() => {
      this.setUserStatuses();
      this.router.navigate(["/login"]);
    });
  }

  private setUserStatuses() {
    this.isLoggedIn = this.tokenService.isLoggedIn();
    this.isAdmin = this.tokenService.isAdmin();
    const user = this.tokenService.getUser();
    this.currentUser = this.isLoggedIn ? user.firstname + " " + user.lastname : "";
  }
}
