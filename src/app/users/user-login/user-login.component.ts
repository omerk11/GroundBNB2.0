import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user.model';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent{

  @Output() onUserLogin = new EventEmitter();

  constructor(public usersService:UsersService) { }

  onSubmit(form:NgForm)
  {
    if(form.invalid)
    {
      console.log("error");
      return;
    }
    
    this.usersService.loginUser(form.value.email, form.value.password).subscribe((user)=>this.onUserLogin.emit(null));
  }
}
