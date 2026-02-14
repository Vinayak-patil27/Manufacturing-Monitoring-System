import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { faPlus, faTrash, faEdit, faPen } from '@fortawesome/free-solid-svg-icons';
import { FormFieldConfig } from 'src/app/Shared/sharedform/form-field-config';
import { MasterService } from '../master.service';
import { LocationMaster } from './locationmaster';

@Component({
  selector: 'app-loactionmaster',
  templateUrl: './loactionmaster.component.html',
  styleUrls: ['./loactionmaster.component.css']
})
export class LoactionmasterComponent implements OnInit {
  formGroup!: FormGroup;
  locationList: LocationMaster[] = [];
  faPlus = faPlus;
  faTrash = faTrash;
  faEdit = faEdit;
  faPen = faPen;
  editid: number = 0;

  formConfig: FormFieldConfig[] = [
    { name: 'locationId', label: 'Location ID', type: 'number', validation: [Validators.required] },
    { name: 'locationName', label: 'Location Name', type: 'text', validation: [Validators.required] },
    { name: 'latitude', label: 'Latitude', type: 'number', validation: [Validators.required] },
    { name: 'longitude', label: 'Longitude', type: 'number', validation: [Validators.required] }
  ];

  constructor(private fb: FormBuilder, private masterservice: MasterService) { }

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
        error: (err) => confirm(err.message)
      });
    } else {
      this.masterservice.saveLocation(this.formGroup.value).subscribe({
        next: (x) => { confirm(x); this.Reset(); },
        error: (err) => confirm(err.message)
      });
    }
  }

  Edit(id: number) {
    if (id > 0) {
      this.masterservice.getLocationById(id).subscribe({
        next: (x) => {
          this.formGroup.patchValue(x);
          this.editid = id;
        },
        error: (err) => confirm(err.message)
      });
    }
  }

  Delete(id: number) {
    if (confirm("Are you sure?") && id > 0) {
      this.masterservice.deleteLocation(id).subscribe({
        next: (x) => { confirm(x); this.Reset(); },
        error: (err) => confirm(err.message)
      });
    }
  }

  Reset() {
    this.formGroup.reset();
    this.editid = 0;
    this.masterservice.getAllLocations().subscribe({
      next: (x) => { this.locationList = x; },
      error: (err) => { this.locationList = []; }
    });
  }
}
