import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { AuthService } from '../auth.service';
import { TokenStorageService } from '../token-storage.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  @Output() onDeleteUser: EventEmitter<any> = new EventEmitter(); 
  errorMessage = '';

  constructor(public tokenService: TokenStorageService, private authService: AuthService, private notificationsService: NotificationsService) { }
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

    this.authService.updateUser(this.user).subscribe((data) => {
      const user = this.tokenService.getUser();
      const modifiedUser = {
        ...user,
        ...data
      };

      this.tokenService.saveUser(modifiedUser);
      this.setUserVar(modifiedUser);
      this.notificationsService.success('User updated', 'User has been updated', { timeOut: 3000, showProgressBar: true , animate: 'fade' , position:['bottom','right']});
    }
    );

  }

  onDelete()
  {
    if(window.confirm("Are you sure you want to delete?"))
    {
      let id = this.tokenService.getMyId();
      console.log(id);
      this.authService.deleteUser(id).subscribe((user)=>{
        this.tokenService.signOut();
        this.onDeleteUser.emit(user)});

      // this.authService.deleteApartment(this.apartment).subscribe((apartment)=>this.onDeleteApartment.emit(apartment));
    }//TODO: deleting doesnt refresh list
  }

}
