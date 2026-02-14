import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { faPlus, faTrash, faEdit, faPen } from '@fortawesome/free-solid-svg-icons';
import { FormFieldConfig } from 'src/app/Shared/sharedform/form-field-config';
import { Componentoperationmaster } from './componentoperationmaster';
import { MasterService } from '../master.service';

@Component({
  selector: 'app-componentoperation',
  templateUrl: './componentoperation.component.html',
  styleUrls: ['./componentoperation.component.css']
})
export class ComponentoperationComponent implements OnInit {
  formGroup!: FormGroup;
  faPlus = faPlus;
  faTrash = faTrash;
  faEdit = faEdit;
  faPen = faPen;
  compopeactonList: Componentoperationmaster[];
  editid: number;

  formConfig: FormFieldConfig[] = [
    { name: 'componentId', label: 'Component Id', type: 'number', size: 'large', validation: [Validators.required] },
    { name: 'machineId', label: 'Machine Id', type: 'number', size: 'large', validation: [Validators.required] },
    { name: 'operationCode', label: 'Operation Code', type: 'text', size: 'large', validation: [Validators.required] },
    { name: 'operationName', label: 'Operation Name', type: 'text', size: 'large', validation: [Validators.required] },
    { name: 'operationDescription', label: 'Operation Description', type: 'textarea', size: 'large', validation: [] },
    { name: 'operationType', label: 'Operation Type', type: 'number', size: 'large', validation: [Validators.required] }
  ];

  constructor(private fb: FormBuilder, private masterservice: MasterService) {
    this.compopeactonList = [];
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
    const payload = this.formGroup.value;
    if (this.editid > 0) {
      this.masterservice.updateComponentOperation(payload, this.editid).subscribe({
        next: (x) => { confirm(x); this.Reset(); },
        error: (err) => {
          const message = err.error?.text ?? err.error ?? err.message ?? 'An error occurred';
          confirm(typeof message === 'string' ? message : 'An error occurred');
        }
      });
    } else {
      this.masterservice.saveComponentOperation(payload).subscribe({
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
      this.masterservice.getComponentOperationById(id).subscribe({
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
      this.masterservice.deleteComponentOperation(id).subscribe({
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
    this.masterservice.getAllComponentOperations().subscribe({
      next: (x) => { this.compopeactonList = x; },
      error: (err) => {
        const message = err.error?.text ?? err.error ?? err.message ?? 'An error occurred';
        confirm(typeof message === 'string' ? message : 'An error occurred');
      }
    });
    this.editid = 0;
  }
}
