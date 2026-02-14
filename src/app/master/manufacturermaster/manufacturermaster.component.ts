import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { faPlus, faTrash, faEdit, faPen } from '@fortawesome/free-solid-svg-icons';
import { FormFieldConfig } from 'src/app/Shared/sharedform/form-field-config';
import { MasterService } from '../master.service';
import { Machinemanufacturer } from './machinemanufacturer';

@Component({
  selector: 'app-manufacturermaster',
  templateUrl: './manufacturermaster.component.html',
  styleUrls: ['./manufacturermaster.component.css']
})
export class ManufacturermasterComponent implements OnInit {
  formGroup!: FormGroup;
  manufacturerList: Machinemanufacturer[] = [];
  faPlus = faPlus;
  faTrash = faTrash;
  faEdit = faEdit;
  faPen = faPen;
  editid: number = 0;

  formConfig: FormFieldConfig[] = [
    {
      name: 'manufacturerId',
      label: 'Manufacturer Id',
      type: 'number',
      validation: [Validators.required]
    },
    {
      name: 'manufacturerName',
      label: 'Manufacturer Name',
      type: 'text',
      validation: [Validators.required]
    }
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
      this.masterservice.updateManufacturer(this.formGroup.value, this.editid).subscribe({
        next: (x) => { confirm(x); this.Reset(); },
        error: (err) => {
          const message = typeof err.error === 'string' ? err.error : (err.error?.text || err.message);
          confirm(message);
        }
      });
    } else {
      this.masterservice.saveManufacturer(this.formGroup.value).subscribe({
        next: (x) => { confirm(x); this.Reset(); },
        error: (err) => {
          const message = typeof err.error === 'string' ? err.error : (err.error?.text || err.message);
          confirm(message);
        }
      });
    }
  }

  Edit(id: number) {
    if (id > 0) {
      this.masterservice.getManufacturerById(id).subscribe({
        next: (x) => {
          this.formGroup.patchValue(x);
          this.editid = id;
        },
        error: (err) => confirm(err.message)
      });
    }
  }

  Delete(id: number) {
    if (confirm("Are you sure you want to delete this manufacturer?") && id > 0) {
      this.masterservice.deleteManufacturer(id).subscribe({
        next: (x) => { confirm(x); this.Reset(); },
        error: (err) => confirm(err.message)
      });
    }
  }

  Reset() {
    this.formGroup.reset();
    this.editid = 0;
    this.masterservice.getAllManufacturers().subscribe({
      next: (x) => { this.manufacturerList = x; },
      error: (err) => {
        if (err.status !== 404) console.error(err);
        this.manufacturerList = [];
      }
    });
  }
}
