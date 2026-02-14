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
  customerList: Customermaster[] = [];
  faPlus = faPlus;
  faTrash = faTrash;
  faEdit = faEdit;
  faPen = faPen;
  editid: number = 0;

  formConfig: FormFieldConfig[] = [
    { name: 'customerId', label: 'Customer ID', type: 'number', validation: [Validators.required] },
    { name: 'customerName', label: 'Customer Name', type: 'text', validation: [Validators.required] }
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
      this.masterservice.updateCustomer(this.formGroup.value, this.editid).subscribe({
        next: (x) => { confirm(x); this.Reset(); },
        error: (err) => confirm(err.message)
      });
    } else {
      this.masterservice.saveCustomer(this.formGroup.value).subscribe({
        next: (x) => { confirm(x); this.Reset(); },
        error: (err) => confirm(err.message)
      });
    }
  }

  Edit(id: number) {
    if (id > 0) {
      this.masterservice.getCustomerById(id).subscribe({
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
      this.masterservice.deleteCustomer(id).subscribe({
        next: (x) => { confirm(x); this.Reset(); },
        error: (err) => confirm(err.message)
      });
    }
  }

  Reset() {
    this.formGroup.reset();
    this.editid = 0;
    this.masterservice.getAllCustomers().subscribe({
      next: (x) => { this.customerList = x; },
      error: (err) => { this.customerList = []; }
    });
  }
}
