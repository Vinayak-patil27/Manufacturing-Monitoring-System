import { DashbordComponent } from './dashbord/dashbord.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentmasterComponent } from './componentmaster/componentmaster.component';
import { ComponentoperationComponent } from './componentoperation/componentoperation.component';
import { CustomermasterComponent } from './customermaster/customermaster.component';
import { LoactionmasterComponent } from './loactionmaster/loactionmaster.component';
import { ManufacturermasterComponent } from './manufacturermaster/manufacturermaster.component';
import { MachinemasterComponent } from './machinemaster/machinemaster.component';


const routes: Routes = [
  { path: 'dashbord', component: DashbordComponent },
  { path: 'component', component: ComponentmasterComponent },
  { path: 'component_operation', component: ComponentoperationComponent },
  { path: 'customer', component: CustomermasterComponent },
  { path: 'location', component: LoactionmasterComponent },
  { path: 'machine_manufacturer', component: ManufacturermasterComponent },
  { path: 'machine', component: MachinemasterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
