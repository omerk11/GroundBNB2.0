// import { Component, EventEmitter, Output } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import { User } from '../user.model';
// import { UsersService } from '../users.service';


// @Component({
//   selector: 'app-users-create',
//   templateUrl: './users-create.component.html',
//   styleUrls: ['./users-create.component.css']
// })
// export class UsersCreateComponent{

//   @Output() onUserAdded = new EventEmitter();

//   constructor(public usersService:UsersService) { }

//   onSubmit(form:NgForm)
//   {
//     if(form.invalid)
//     {
//       console.log("error");
//       return;
//     }
//     const new_user: User=
//     {
//       name:form.value.name,
//       password:form.value.password,
//       email:form.value.email,
//       phone:form.value.phone,
//       apartments:[],
//       reservations: [],
//       roles:['user']
//     }
//     this.usersService.addUser(new_user).subscribe((user)=>this.onUserAdded.emit(null));
//   }
// }
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
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
  constructor(private authService: AuthService) { }
  ngOnInit(): void {
  }
  onSubmit(form: NgForm): void {
    if(form.invalid)
    {
      console.log("error");
      return;
    }

    const new_user : User ={
      firstname:form.value.firstname,
      lastname:form.value.lastname,
      password:form.value.password,
      email:form.value.email,
      phone:form.value.phone,
      roles:['user']
    }
    this.authService.signup(new_user).subscribe({
      next: data => {
        console.log(data);

        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.errorMessage = "";
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
}