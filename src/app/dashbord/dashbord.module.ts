// import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';

// import { DashbordRoutingModule } from './dashbord-routing.module';
// import { MainPageComponent } from './main-page/main-page.component';
// import { HeaderComponent } from './header/header.component';
// import { SidenavComponent } from './sidenav/sidenav.component';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { LoginComponent } from './login/login.component';
// import { AppRoutingModule } from '../app-routing.module';
// import { AppComponent } from '../app.component';
// import { RouterModule } from '@angular/router';


// @NgModule({
//   declarations: [
//     MainPageComponent,
//     HeaderComponent,
//     SidenavComponent,
//     LoginComponent
//   ],
//   imports: [
//     CommonModule,
//     FontAwesomeModule,
//     DashbordRoutingModule,
//     RouterModule,
//     AppRoutingModule
//   ]
// })
// export class DashbordModule { }
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Required for router-outlet
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { DashbordRoutingModule } from './dashbord-routing.module';
import { MainPageComponent } from './main-page/main-page.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedModule } from '../Shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MainPageComponent,
    HeaderComponent,
    LoginComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    DashbordRoutingModule, // This handles the child routes
    RouterModule ,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports:[LoginComponent]
})
export class DashbordModule { } 