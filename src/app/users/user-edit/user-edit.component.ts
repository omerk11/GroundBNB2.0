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

  constructor(public tokenService: TokenStorageService, private authService: AuthService) { }
  user: any = {};
  ngOnInit(): void {
    let tmp = this.tokenService.getUser();
    this.setUserVar(tmp);
  }

  setUserVar(newUser: any) {
    console.log(newUser);
    this.user.firstname = newUser.firstname;
    this.user.lastname = newUser.lastname;
    this.user.email = newUser.email;
    this.user.phone = newUser.phone;
    this.user.password = newUser.password;
    if (newUser.newpassword) {
      this.user.newpassword = newUser.newpassword;
    }
    this.user._id = newUser.id;
  }
  reloadPage(): void {
    window.location.reload();
  }
  onSubmit(form: NgForm): void {
    if (form.invalid) {
      console.log("error");
      return;
    }

    this.authService.updateUser(this.user).subscribe((data) => {
      const user = this.tokenService.getUser();
      const modifiedUser = {
        ...user,
        ...data
      };

      this.tokenService.saveUser(modifiedUser);
      this.setUserVar(modifiedUser);
    }
    );

  }

}
