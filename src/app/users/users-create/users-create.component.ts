import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user.model';
import { UsersService } from '../users.service';


@Component({
  selector: 'app-users-create',
  templateUrl: './users-create.component.html',
  styleUrls: ['./users-create.component.css']
})
export class UsersCreateComponent{

  @Output() onUserAdded = new EventEmitter();

  constructor(public usersService:UsersService) { }

  onSubmit(form:NgForm)
  {
    if(form.invalid)
    {
      console.log("error");
      return;
    }
    const new_user: User=
    {
      name:form.value.name,
      password:form.value.password,
      email:form.value.email,
      phone:form.value.phone,
      apartments:[],
      reservations: [],
      isadmin:false
    }
    this.usersService.addUser(new_user).subscribe((user)=>this.onUserAdded.emit(null));
  }
}
