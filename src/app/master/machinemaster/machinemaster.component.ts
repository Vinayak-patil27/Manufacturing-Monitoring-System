import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { faPlus, faTrash, faEdit, faPen } from '@fortawesome/free-solid-svg-icons';
import { FormFieldConfig } from 'src/app/Shared/sharedform/form-field-config';
import { MasterService } from '../master.service';
import { Machinemaster, MachineType } from './machinemaster';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-machinemaster',
  templateUrl: './machinemaster.component.html',
  styleUrls: ['./machinemaster.component.css']
})
export class MachinemasterComponent implements OnInit {
  formGroup!: FormGroup;
  machineList: Machinemaster[] = [];
  faPlus = faPlus;
  faTrash = faTrash;
  faEdit = faEdit;
  faPen = faPen;
  editid: number = 0;

  formConfig: FormFieldConfig[] = [
    { name: 'machineId', label: 'Machine Id', type: 'number', validation: [Validators.required] },
    { name: 'machineName', label: 'Machine Name', type: 'text', validation: [Validators.required] },
    { name: 'machineSerialNumber', label: 'Serial Number', type: 'text', validation: [Validators.required] },
    { name: 'machineManufacturerId', label: 'Manufacturer', type: 'select', options: [], validation: [Validators.required] },
    { name: 'machineModel', label: 'Model', type: 'text', validation: [Validators.required] },
    { name: 'yearofManufacture', label: 'Year of Manufacture', type: 'number', validation: [Validators.required] },
    { name: 'machineType', label: 'Type of Machine', type: 'select', options: this.getMachineTypeOptions(), validation: [Validators.required] },
    { name: 'locationId', label: 'Location', type: 'select', options: [], validation: [Validators.required] }
  ];

  constructor(private fb: FormBuilder, private masterservice: MasterService) { }

  ngOnInit(): void {
    this.formGroup = this.generateForm();
    this.loadDropdownData();
    this.Reset();
  }

  getMachineTypeOptions() {
    return [
      { label: 'CNC Turning Center', value: 1 },
      { label: 'VMC', value: 2 },
      { label: 'HMC', value: 3 },
      { label: 'HBM', value: 4 },
      { label: 'VTL', value: 5 },
      { label: '5-Axis Machining Center', value: 6 }
    ];
  }

  loadDropdownData() {
    forkJoin({
      manufacturers: this.masterservice.getAllManufacturers(),
      locations: this.masterservice.getAllLocations()
    }).subscribe({
      next: (res) => {
        const manfField = this.formConfig.find(f => f.name === 'machineManufacturerId');
        if (manfField) manfField.options = res.manufacturers.map(m => ({ label: m.manufacturerName, value: m.manufacturerId }));

        const locField = this.formConfig.find(f => f.name === 'locationId');
        if (locField) locField.options = res.locations.map(l => ({ label: l.locationName, value: l.locationId }));
      }
    });
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
      this.masterservice.updateMachine(this.formGroup.value, this.editid).subscribe({
        next: (x) => { confirm(x); this.Reset(); },
        error: (err) => confirm(err.message)
      });
    } else {
      this.masterservice.saveMachine(this.formGroup.value).subscribe({
        next: (x) => { confirm(x); this.Reset(); },
        error: (err) => confirm(err.message)
      });
    }
  }

  Edit(id: number) {
    if (id > 0) {
      this.masterservice.getMachineById(id).subscribe({
        next: (x) => {
          const formValue = {
            ...x,
            locationId: (x as any).loactionId ?? x.locationId
          };
          this.formGroup.patchValue(formValue);
          this.editid = id;
        },
        error: (err) => {
          const message = err.error?.text ?? err.error ?? err.message ?? 'An error occurred';
          confirm(typeof message === 'string' ? message : 'An error occurred');
        }
      });
    }
  }

  Delete(id: number) {
    if (confirm("Are you sure?") && id > 0) {
      this.masterservice.deleteMachine(id).subscribe({
        next: (x) => { confirm(x); this.Reset(); },
        error: (err) => confirm(err.message)
      });
    }
  }

  Reset() {
    this.formGroup.reset();
    this.editid = 0;
    this.masterservice.getAllMachines().subscribe({
      next: (x) => { this.machineList = x; },
      error: (err) => { this.machineList = []; }
    });
  }
}
