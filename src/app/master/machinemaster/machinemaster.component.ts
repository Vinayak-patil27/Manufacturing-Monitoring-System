import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { faPlus, faTrash, faEdit, faPen } from '@fortawesome/free-solid-svg-icons';
import { FormFieldConfig } from 'src/app/Shared/sharedform/form-field-config';
import { Machinemanufacturer } from '../manufacturermaster/machinemanufacturer';
import { MasterService } from '../master.service';

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
  machinemanufacturerList: Machinemanufacturer[];
  editid: number;

  formConfig: FormFieldConfig[] = [
    { name: 'ManufacturerId', label: 'Manufacturer Id', type: 'number', size: 'large', validation: [Validators.required] },
    { name: 'ManufacturerName', label: 'Manufacturer Name', type: 'text', size: 'large', validation: [Validators.required] }
  ];

  constructor(private fb: FormBuilder, private masterservice: MasterService) {
    this.machinemanufacturerList = [];
    this.editid = 0;
  }

  ngOnInit(): void {
    this.formGroup = this.generateFrom();
    this.Reset();
  }

  generateFrom() {
    const group = this.fb.group({});
    this.formConfig.forEach(field => {
      group.addControl(field.name, this.fb.control(field.value || '', field.validation));
    });
    return group;
  }

  Save() {
    if (!this.formGroup.valid) return;
    if (this.editid > 0) {
      this.masterservice.updateManufacturer(this.formGroup.value, this.editid).subscribe({
        next: (x) => { confirm(x); this.Reset(); },
        error: (err) => {
          const message = err.error?.text ?? err.error ?? err.message ?? 'An error occurred';
          confirm(typeof message === 'string' ? message : 'An error occurred');
        }
      });
    } else {
      this.masterservice.saveManufacturer(this.formGroup.value).subscribe({
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
      this.masterservice.getManufacturerById(id).subscribe({
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
      this.masterservice.deleteManufacturer(id).subscribe({
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
    this.masterservice.getAllManufacturers().subscribe({
      next: (x) => { this.machinemanufacturerList = x; },
      error: (err) => {
        if (err.status === 404) {
          this.machinemanufacturerList = [];
          return;
        }
        const message = err.error?.text ?? err.error ?? err.message ?? 'An error occurred';
        confirm(typeof message === 'string' ? message : 'An error occurred');
      }
    });
    this.editid = 0;
  }
}
