import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  @Output() onSignUp: EventEmitter<any> = new EventEmitter();

  constructor(
    private authService: AuthService, private tokenStorage: TokenStorageService) { }
  ngOnInit(): void {
  }
  reloadPage(): void {
    window.location.reload();
  }
  onSubmit(form: NgForm): void {
    if (form.invalid) {
      console.log("error");
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
  }
}