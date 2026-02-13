import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { DashbordComponent } from './dashbord/dashbord.component';
import { MachinemasterComponent } from './machinemaster/machinemaster.component';
import { ComponentmasterComponent } from './componentmaster/componentmaster.component';
import { ManufacturermasterComponent } from './manufacturermaster/manufacturermaster.component';
import { CustomermasterComponent } from './customermaster/customermaster.component';
import { LoactionmasterComponent } from './loactionmaster/loactionmaster.component';
import { ComponentoperationComponent } from './componentoperation/componentoperation.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../Shared/shared.module';


@NgModule({
  declarations: [
    DashbordComponent,
    MachinemasterComponent,
    ComponentmasterComponent,
    ManufacturermasterComponent,
    CustomermasterComponent,
    LoactionmasterComponent,
    ComponentoperationComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MasterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class MasterModule { }
