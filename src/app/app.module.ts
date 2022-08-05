import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';//added manualy
import { HttpClientModule } from "@angular/common/http";//added manualy
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';//added manualy
import { MatCardModule } from '@angular/material/card';//added manualy
import { MatButtonModule } from '@angular/material/button';//added manualy
import { MatToolbarModule } from '@angular/material/toolbar';//added manualy
import { MatExpansionModule } from '@angular/material/expansion';
import { AppRoutingModule } from './app-routing.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


import { AppComponent } from './app.component';
import { ApartmentCreateComponent } from './apartments/apartment-create/apartment-create.component';
import { HeaderComponent } from './header/header.component';
import { ApartmentListComponent } from './apartments/apartment-list/apartment-list.component';
import { ApartmentItemComponent } from './apartments/apartment-item/apartment-item.component';
import { UsersCreateComponent } from './users/users-create/users-create.component';//added manualy
import { ApartmentEditComponent } from './apartments/apartment-edit/apartment-edit.component';
import { ReservationListComponent } from './reservations/reservation-list/reservation-list.component';
import { ReservationItemComponent } from './reservations/reservation-item/reservation-item.component';
import { UserLoginComponent } from './users/user-login/user-login.component';
import { ApartmentSearchComponent } from './apartments/apartment-search/apartment-search.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';//added manualy


@NgModule({
  declarations: [
    AppComponent,
    ApartmentCreateComponent,
    HeaderComponent,
    ApartmentListComponent,
    ApartmentItemComponent,
    ApartmentEditComponent,
    UsersCreateComponent,
    ReservationListComponent,
    ReservationItemComponent,
    UserLoginComponent,
    ApartmentSearchComponent,
    UserProfileComponent,
    UserEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule,
    MatCheckboxModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientModule,
    MatFormFieldModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
