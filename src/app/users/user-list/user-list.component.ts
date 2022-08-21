import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  constructor(public authservice: AuthService) { 

  }

  ngOnInit(): void 
  {// when apartment-list is created
    this.refreshList();
  }

  refreshList()
  {
    this.authservice.getUsers().subscribe((users)=>{this.users = users;});
  }
}
