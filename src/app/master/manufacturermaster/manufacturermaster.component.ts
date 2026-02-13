import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { faPlus, faTrash, faEdit, faPen } from '@fortawesome/free-solid-svg-icons';
import { FormFieldConfig } from 'src/app/Shared/sharedform/form-field-config';
import { Machinemaster } from '../machinemaster/machinemaster';

@Component({
  selector: 'app-manufacturermaster',
  templateUrl: './manufacturermaster.component.html',
  styleUrls: ['./manufacturermaster.component.css']
})
export class ManufacturermasterComponent implements OnInit {

  formGroup!: FormGroup;
  machinelist:Machinemaster[];
  faPlus = faPlus;
  faTrash = faTrash;
  faEdit = faEdit;
  faPen = faPen;
  formConfig: FormFieldConfig[] = [
    {
      name: 'MachineName',
      label: 'Machine Name',
      type: 'text',
      size: 'large',
      color: '',
      customClass: '',
      validation: [Validators.required]
    },
    {
      name: 'MachineSerialNo',
      label: 'Machine Serial Number',
      type: 'text',
      color: '',
      validation: [Validators.required]
    },
    {
      name: 'MachineManufacturerId',
      label: 'Machine Manufacturer Id',
      type: 'number',
      color: '',
      validation: [Validators.required]
    },
    {
      name: 'MachineMode',
      label: 'Machine Mode',
      type: 'text',
      color: '',
      validation: [Validators.required]
    },
    {
      name: 'ManufactureYear',
      label: 'Year of Manufacture',
      type: 'number',
      color: '',
      validation: [Validators.required]
    },
    {
      name: 'MachineType',
      label: 'Type of Machine',
      type: 'number',
      color: '',
      validation: [Validators.required]
    },
    {
      name: 'LocationId',
      label: 'Location Id',
      type: 'number',
      color: ''
    }

  ];
  constructor(private fb: FormBuilder) { 
    this.machinelist=[];
  }

  ngOnInit(): void {
    this.formGroup = this.generateFrom();
  }

  generateFrom() {
    const group = this.fb.group({});
    this.formConfig.forEach(field => {
      group.addControl(field.name, this.fb.control(field.value || '', field.validation));
    });
    return group;
  }


  Save() {
    confirm("submit succesfull")
    this.Reset();
  }

  Edit(id: number) {
    const selectedComponent = this.machinelist.find(x => x.McahineID === id);
    debugger
    if (selectedComponent) {
      this.formGroup.patchValue(selectedComponent);
    }
  }

  Delete(id: number) {
    this.machinelist = this.machinelist.filter(x => x.McahineID != id);
    this.Reset();
  }
  Reset()
  {
    this.formGroup.reset();
  }
}
