import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { faPlus, faTrash, faEdit, faPen } from '@fortawesome/free-solid-svg-icons';
import { FormFieldConfig } from 'src/app/Shared/sharedform/form-field-config';
import { Machinemanufacturer } from '../manufacturermaster/machinemanufacturer';

@Component({
  selector: 'app-machinemaster',
  templateUrl: './machinemaster.component.html',
  styleUrls: ['./machinemaster.component.css']
})
export class MachinemasterComponent implements OnInit {
  formGroup!: FormGroup;
    faPlus = faPlus;
  faTrash = faTrash;
  faEdit = faEdit;
  faPen = faPen;
    machinemanufacturerList:Machinemanufacturer[];

  formConfig : FormFieldConfig[]=[
    {
      name:'ManufacturerId',
      label:' Manufacturer Id',
      type:'text',
      size:'large',
      validation:[Validators.required]
    },
    {
      name:'ManufacturerName',
      label:' Manufacturer Name',
      type:'text',
      size:'large',
      validation:[Validators.required]
    }
  ]
  constructor(private fb: FormBuilder) { 
    this.machinemanufacturerList=[];
  }

  ngOnInit(): void {
    this.formGroup=this.generateFrom();
  }

  generateFrom(){
    const group=this.fb.group({});
    this.formConfig.forEach(field => { group.addControl(field.name,this.fb.control(field.value || '',field.validation));      
    });
    return group;
  }


  Save() {
    confirm("submit succesfull")
    this.Reset();
  }

  Edit(id: number) {
    const selectedComponent = this.machinemanufacturerList.find(x => x.ManufacturerId === id);
    debugger
    if (selectedComponent) {
      this.formGroup.patchValue(selectedComponent);
    }
  }

  Delete(id: number) {
    this.machinemanufacturerList = this.machinemanufacturerList.filter(x => x.ManufacturerId != id);
    this.Reset();
  }
  Reset()
  {
    this.formGroup.reset();
  }

}
