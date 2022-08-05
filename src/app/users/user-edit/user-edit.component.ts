import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { TokenStorageService } from '../token-storage.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  constructor(public tokenService :TokenStorageService,private authService: AuthService) { }
  user : any  = {};
  ngOnInit(): void {
    let tmp = this.tokenService.getUser();
    this.user.firstname = tmp.firstname;
    this.user.lastname = tmp.lastname;
    this.user.email = tmp.email;
    this.user.phone = tmp.phone;
    this.user.password = tmp.password;
    this.user.newpassword = tmp.newpassword;
    this.user._id = tmp.id;
  }
  onSubmit(form: NgForm): void {
    if(form.invalid)
    {
      console.log("error");
      return;
    }

    this.authService.updateUser(this.user).subscribe();

    // this.authService.signup(new_user).subscribe({
    //   next: data => {
    //     console.log(data);
    //     this.isSuccessful = true;
    //     this.isSignUpFailed = false;
    //   },
    //   error: err => {
    //     this.errorMessage = err.error.message;
    //     this.isSignUpFailed = true;
    //   }
    // });
  }

}
