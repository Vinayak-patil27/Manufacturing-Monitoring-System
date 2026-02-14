import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { faPlus, faTrash, faEdit, faPen } from '@fortawesome/free-solid-svg-icons';
import { FormFieldConfig } from 'src/app/Shared/sharedform/form-field-config';
import { LocationMaster } from './locationmaster';
import { MasterService } from '../master.service';

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
  locationList: LocationMaster[];
  editid: number;

  formConfig: FormFieldConfig[] = [
    { name: 'LocationId', label: 'Location Id', type: 'number', size: 'large', validation: [Validators.required] },
    { name: 'LocationName', label: 'Location Name', type: 'text', size: 'large', validation: [Validators.required] },
    { name: 'Latitude', label: 'Latitude', type: 'number', size: 'large', validation: [Validators.required] },
    { name: 'Longitude', label: 'Longitude', type: 'number', size: 'large', validation: [Validators.required] }
  ];

  constructor(private fb: FormBuilder, private masterservice: MasterService) {
    this.locationList = [];
    this.editid = 0;
  }

  ngOnInit(): void {
    this.formGroup = this.generateForm();
    this.Reset();
  }

  generateForm() {
    const group = this.fb.group({});
    this.formConfig.forEach(field => {
      group.addControl(field.name, this.fb.control(field.value || '', field.validation));
    });
    return group;
  }

  Save() {
    if (!this.formGroup.valid) return;
    if (this.editid > 0) {
      this.masterservice.updateLocation(this.formGroup.value, this.editid).subscribe({
        next: (x) => { confirm(x); this.Reset(); },
        error: (err) => {
          const message = err.error?.text ?? err.error ?? err.message ?? 'An error occurred';
          confirm(typeof message === 'string' ? message : 'An error occurred');
        }
      });
    } else {
      this.masterservice.saveLocation(this.formGroup.value).subscribe({
        next: (x) => { confirm(x); this.Reset(); },
        error: (err) => {
          const message = err.error?.text ?? err.error ?? err.message ?? 'An error occurred';
          confirm(typeof message === 'string' ? message : 'An error occurred');
        }
      });
    }
  }

  Edit(id: number) {
    if (id > 0) {
      this.masterservice.getLocationById(id).subscribe({
        next: (x) => { this.formGroup.patchValue(x); this.editid = id; },
        error: (err) => {
          const message = err.error?.text ?? err.error ?? err.message ?? 'An error occurred';
          confirm(typeof message === 'string' ? message : 'An error occurred');
        }
      });
    }
  }

  Delete(id: number) {
    if (id > 0) {
      this.masterservice.deleteLocation(id).subscribe({
        next: (x) => { confirm(x); this.Reset(); },
        error: (err) => {
          const message = err.error?.text ?? err.error ?? err.message ?? 'An error occurred';
          confirm(typeof message === 'string' ? message : 'An error occurred');
        }
      });
    }
  }

  Reset() {
    this.formGroup.reset();
    this.masterservice.getAllLocations().subscribe({
      next: (x) => { this.locationList = x; },
      error: (err) => {
        const message = err.error?.text ?? err.error ?? err.message ?? 'An error occurred';
        confirm(typeof message === 'string' ? message : 'An error occurred');
      }
    });
    this.editid = 0;
  }
}
