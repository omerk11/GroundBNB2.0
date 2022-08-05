// import { Component, EventEmitter, OnInit, Output } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import { User } from '../user.model';
// import { UsersService } from '../users.service';

// @Component({
//   selector: 'app-user-login',
//   templateUrl: './user-login.component.html',
//   styleUrls: ['./user-login.component.css']
// })
// export class UserLoginComponent{

//   @Output() onUserLogin = new EventEmitter();

//   constructor(public usersService:UsersService) { }

//   onSubmit(form:NgForm)
//   {
//     if(form.invalid)
//     {
//       console.log("error");
//       return;
//     }
    
//     this.usersService.loginUser(form.value.email, form.value.password).subscribe((user)=>this.onUserLogin.emit(null));
//   }
// }
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  form: any = {
    emaill: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }
  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }
  onSubmit(): void {
    console.log('submit');
    const { email, password } = this.form;
    console.log(email);
    console.log(password);

    this.authService.login(email, password).subscribe({
      next: data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }
  reloadPage(): void {
    window.location.reload();
  }
}