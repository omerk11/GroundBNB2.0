import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthGuard } from './users/auth.guard';
import { UserApartmentsComponent } from './users/user-apartments/user-apartments.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { UserLoginComponent } from './users/user-login/user-login.component';
import { UserReservationsComponent } from './users/user-reservations/user-reservations.component';
import { UsersCreateComponent } from './users/users-create/users-create.component';

const routes: Routes = [
  {
    path: 'login',
    component: UserLoginComponent
  },
  {
    path: 'signup',
    component: UsersCreateComponent
  },
  {
    path: 'user/settings',
    component: UserEditComponent
  },
  {
    path: 'user/apartments',
    component: UserApartmentsComponent
  },
  {
    path: 'user/reservations',
    component: UserReservationsComponent
  },
  {
    path: 'adminpage',
    component: AdminpageComponent
  },
  {
    path: '',
    component: HomepageComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
