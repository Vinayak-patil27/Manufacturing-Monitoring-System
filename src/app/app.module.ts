import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedformComponent } from './Shared/sharedform/sharedform.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashbordModule } from './dashbord/dashbord.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    DashbordModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
