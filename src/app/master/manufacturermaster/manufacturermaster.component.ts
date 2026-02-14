import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { faPlus, faTrash, faEdit, faPen } from '@fortawesome/free-solid-svg-icons';
import { FormFieldConfig } from 'src/app/Shared/sharedform/form-field-config';
import { Machinemaster } from '../machinemaster/machinemaster';
import { MasterService } from '../master.service';

@Component({
  selector: 'app-manufacturermaster',
  templateUrl: './manufacturermaster.component.html',
  styleUrls: ['./manufacturermaster.component.css']
})
export class ManufacturermasterComponent implements OnInit {
  formGroup!: FormGroup;
  machinelist: Machinemaster[];
  faPlus = faPlus;
  faTrash = faTrash;
  faEdit = faEdit;
  faPen = faPen;
  editid: number;
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
      size: 'large',
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
  constructor(private fb: FormBuilder, private masterservice: MasterService) {
    this.machinelist = [];
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
      this.masterservice.updateMachine(this.formGroup.value, this.editid).subscribe({
        next: (x) => { confirm(x); this.Reset(); },
        error: (err) => {
          const message = err.error?.text ?? err.error ?? err.message ?? 'An error occurred';
          confirm(typeof message === 'string' ? message : 'An error occurred');
        }
      });
    } else {
      this.masterservice.saveMachine(this.formGroup.value).subscribe({
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
      this.masterservice.getMachineById(id).subscribe({
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
      this.masterservice.deleteMachine(id).subscribe({
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
    this.masterservice.getAllMachines().subscribe({
      next: (x) => { this.machinelist = x; },
      error: (err) => {
        const message = err.error?.text ?? err.error ?? err.message ?? 'An error occurred';
        confirm(typeof message === 'string' ? message : 'An error occurred');
      }
    });
    this.editid = 0;
  }
}
