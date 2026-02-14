import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { faPlus, faTrash, faEdit, faPen } from '@fortawesome/free-solid-svg-icons';
import { FormFieldConfig } from 'src/app/Shared/sharedform/form-field-config';
import { MasterService } from '../master.service';
import { Componentoperationmaster, OperationType } from './componentoperationmaster';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-componentoperation',
  templateUrl: './componentoperation.component.html',
  styleUrls: ['./componentoperation.component.css']
})
export class ComponentoperationComponent implements OnInit {
  formGroup!: FormGroup;
  compopeactonList: Componentoperationmaster[] = [];
  faPlus = faPlus;
  faTrash = faTrash;
  faEdit = faEdit;
  faPen = faPen;
  editid: number = 0;

  formConfig: FormFieldConfig[] = [
    { name: 'componentId', label: 'Component', type: 'select', options: [], validation: [Validators.required] },
    { name: 'machineId', label: 'Machine', type: 'select', options: [], validation: [Validators.required] },
    { name: 'operationCode', label: 'Operation Code', type: 'text', validation: [Validators.required] },
    { name: 'operationName', label: 'Operation Name', type: 'text', validation: [Validators.required] },
    { name: 'operationDescription', label: 'Description', type: 'textarea' },
    { name: 'operationType', label: 'Operation Type', type: 'select', options: this.getOperationTypeOptions(), validation: [Validators.required] }
  ];

  constructor(private fb: FormBuilder, private masterservice: MasterService) { }

  ngOnInit(): void {
    this.formGroup = this.generateForm();
    this.loadDropdownData();
    this.Reset();
  }

  getOperationTypeOptions() {
    return [
      { label: 'Turning', value: 1 },
      { label: 'Milling', value: 2 },
      { label: 'Drilling', value: 3 },
      { label: 'Chamfering', value: 4 },
      { label: 'Tapping', value: 5 },
      { label: 'Threading', value: 6 },
      { label: 'Boring', value: 7 },
      { label: 'Knurling', value: 8 },
      { label: 'Honing', value: 9 },
    ];
  }

  getOperationTypeName(type: number): string {
    return OperationType[type] || 'Unknown';
  }

  loadDropdownData() {
    forkJoin({
      components: this.masterservice.getAllComponents(),
      machines: this.masterservice.getAllMachines()
    }).subscribe({
      next: (res) => {
        const compField = this.formConfig.find(f => f.name === 'componentId');
        if (compField) compField.options = res.components.map(c => ({ label: c.componentName, value: c.componentId }));

        const machField = this.formConfig.find(f => f.name === 'machineId');
        if (machField) machField.options = res.machines.map(m => ({ label: m.machineName, value: m.machineId }));
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
      this.masterservice.updateComponentOperation(this.formGroup.value, this.editid).subscribe({
        next: (x) => { confirm(x); this.Reset(); },
        error: (err) => confirm(err.message)
      });
    } else {
      this.masterservice.saveComponentOperation(this.formGroup.value).subscribe({
        next: (x) => { confirm(x); this.Reset(); },
        error: (err) => confirm(err.message)
      });
    }
  }

  Edit(id: number) {
    if (id > 0) {
      this.masterservice.getComponentOperationById(id).subscribe({
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
      this.masterservice.deleteComponentOperation(id).subscribe({
        next: (x) => { confirm(x); this.Reset(); },
        error: (err) => confirm(err.message)
      });
    }
  }

  Reset() {
    this.formGroup.reset();
    this.editid = 0;
    this.masterservice.getAllComponentOperations().subscribe({
      next: (x) => { this.compopeactonList = x; },
      error: (err) => { this.compopeactonList = []; }
    });
  }
}
