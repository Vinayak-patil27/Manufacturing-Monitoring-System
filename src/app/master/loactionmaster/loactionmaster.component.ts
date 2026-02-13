import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { faPlus, faTrash, faEdit, faPen } from '@fortawesome/free-solid-svg-icons';
import { FormFieldConfig } from 'src/app/Shared/sharedform/form-field-config';
import { LocationMaster } from './locationmaster';

@Component({
  selector: 'app-loactionmaster',
  templateUrl: './loactionmaster.component.html',
  styleUrls: ['./loactionmaster.component.css']
})
export class LoactionmasterComponent implements OnInit {
  formGroup!: FormGroup;
  faPlus = faPlus;
  faTrash = faTrash;
  faEdit = faEdit;
  faPen = faPen;
    locationList:LocationMaster[];
    
  formConfig: FormFieldConfig[] = [
    {
      name: 'LocationId',
      label: 'Location Id',
      type: 'number',
      size: 'large',
      validation: [Validators.required]
    },
    {
      name: 'LocationName',
      label: 'Location Name',
      type: 'text',
      size: 'large',
      validation: [Validators.required]
    },
    {
      name: 'Latitude',
      label: 'Latitude',
      type: 'number',
      size: 'large',
      validation: [Validators.required]
    },
    {
      name: 'Longitude',
      label: 'Longitude',
      type: 'number',
      size: 'large',
      validation: [Validators.required]
    }
  ]
  constructor(private fb: FormBuilder) {
this.locationList=[];
  }

  ngOnInit(): void {
    this.formGroup = this.generateForm();
  }

  generateForm() {
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
    const selectedComponent = this.locationList.find(x => x.LocationId === id);
    debugger
    if (selectedComponent) {
      this.formGroup.patchValue(selectedComponent);
    }
  }

  Delete(id: number) {
    this.locationList = this.locationList.filter(x => x.LocationId != id);
    this.Reset();
  }
  Reset()
  {
    this.formGroup.reset();
  }

}
