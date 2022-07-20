import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';//added manualy

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApartmentCreateComponent } from './apartments/apartment-create/apartment-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';//added manualy
import {MatCardModule} from '@angular/material/card';//added manualy
import {MatButtonModule} from '@angular/material/button';//added manualy
import {MatToolbarModule} from '@angular/material/toolbar';//added manualy
import {MatExpansionModule} from '@angular/material/expansion';
import { HeaderComponent } from './header/header.component';
import { ApartmentListComponent } from './apartments/apartment-list/apartment-list.component';//added manualy

@NgModule({
  declarations: [
    AppComponent,
    ApartmentCreateComponent,
    HeaderComponent,
    ApartmentListComponent
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
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
