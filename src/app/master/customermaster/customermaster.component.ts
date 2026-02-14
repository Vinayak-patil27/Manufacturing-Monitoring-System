import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { faPlus, faTrash, faEdit, faPen } from '@fortawesome/free-solid-svg-icons';
import { FormFieldConfig } from 'src/app/Shared/sharedform/form-field-config';
import { Customermaster } from './customermaster';
import { MasterService } from '../master.service';

@Component({
  selector: 'app-customermaster',
  templateUrl: './customermaster.component.html',
  styleUrls: ['./customermaster.component.css']
})
export class CustomermasterComponent implements OnInit {
  formGroup!: FormGroup;
  faPlus = faPlus;
  faTrash = faTrash;
  faEdit = faEdit;
  faPen = faPen;
  customerList: Customermaster[];
  editid: number;

  formConfig: FormFieldConfig[] = [
    { name: 'Cusotmerid', label: 'Cusotmer ID', type: 'number', size: 'large', validation: [Validators.required] },
    { name: 'CusotmerName', label: 'Cusotmer Name', type: 'text', size: 'large', validation: [Validators.required] }
  ];

  constructor(private fb: FormBuilder, private masterservice: MasterService) {
    this.customerList = [];
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
      this.masterservice.updateCustomer(this.formGroup.value, this.editid).subscribe({
        next: (x) => { confirm(x); this.Reset(); },
        error: (err) => {
          const message = err.error?.text ?? err.error ?? err.message ?? 'An error occurred';
          confirm(typeof message === 'string' ? message : 'An error occurred');
        }
      });
    } else {
      this.masterservice.saveCustomer(this.formGroup.value).subscribe({
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
      this.masterservice.getCustomerById(id).subscribe({
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
      this.masterservice.deleteCustomer(id).subscribe({
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
    this.masterservice.getAllCustomers().subscribe({
      next: (x) => { this.customerList = x; },
      error: (err) => {
        const message = err.error?.text ?? err.error ?? err.message ?? 'An error occurred';
        confirm(typeof message === 'string' ? message : 'An error occurred');
      }
    });
    this.editid = 0;
  }
}
