import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedformComponent } from './sharedform/sharedform.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    SharedformComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[SharedformComponent]
})
export class SharedModule { }
