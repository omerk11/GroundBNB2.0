import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { AuthService } from '../auth.service';
import { TokenStorageService } from '../token-storage.service';
import { User } from '../user.model';

@Component({
  selector: 'app-users-create',
  templateUrl: './users-create.component.html',
  styleUrls: ['./users-create.component.css']
})
export class UsersCreateComponent implements OnInit {
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  isCreating: boolean = false;
  @Output() onSignUp: EventEmitter<any> = new EventEmitter();

  constructor(
    private authService: AuthService, private tokenStorage: TokenStorageService, private notificationsService: NotificationsService) { }
  ngOnInit(): void {
  }
  reloadPage(): void {
    window.location.reload();
  }
  onSubmit(form: NgForm): void {
    if (form.invalid || this.isCreating) {
      console.log("error");
      return;
    }

    this.isCreating = true;
    let emailRegex = /^(([^<>()[]\.,;:\s@"]+(.[^<>()[]\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
    let phoneRegex = /^\d{10}$/;
    if (!emailRegex.test(form.value.email)) {
      this.errorMessage = "Please enter a valid email address!";
      return;
    }

    if (!phoneRegex.test(form.value.phone)) {
      this.errorMessage = "Please enter a valid phone number!";
      return;
    }

    const new_user: User = {
      firstname: form.value.firstname,
      lastname: form.value.lastname,
      password: form.value.password,
      email: form.value.email,
      phone: form.value.phone,
      roles: ['user']
    }
    this.authService.signup(new_user).subscribe({
      next: data => {
        console.log(data);

        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.errorMessage = "";
        this.authService.login(new_user.email, new_user.password).subscribe({
          next: data => {
            this.errorMessage = "";
            this.tokenStorage.saveToken(data.accessToken);
            this.tokenStorage.saveUser(data);
            this.reloadPage();

          },
          error: err => {
            this.errorMessage = err.error.message;
          }
        });
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }

    });
    this.notificationsService.success('User created', 'User has been created', { timeOut: 3000, showProgressBar: true , animate: 'fade' , position:['bottom','right']});
    this.isCreating = false;
  }
}