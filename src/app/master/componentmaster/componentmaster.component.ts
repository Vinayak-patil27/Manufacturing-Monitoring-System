import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { faPlus, faTrash, faEdit, faPen } from '@fortawesome/free-solid-svg-icons';
import { FormFieldConfig } from 'src/app/Shared/sharedform/form-field-config';
import { Componentmaster } from './componentmaster';
import { MasterService } from '../master.service';

@Component({
  selector: 'app-componentmaster',
  templateUrl: './componentmaster.component.html',
  styleUrls: ['./componentmaster.component.css']
})
export class ComponentmasterComponent implements OnInit {

  formGroup!: FormGroup;
  faPlus = faPlus;
  faTrash = faTrash;
  faEdit = faEdit;
  faPen = faPen;
  componentList: Componentmaster[];
  editid: number;

  formConfig: FormFieldConfig[] = [
    {
      name: 'componentId',
      label: 'Component Id',
      type: 'number',
      size: 'large',
      validation: [Validators.required]
    }, {
      name: 'customerId',
      label: 'Customer Id',
      type: 'number',
      size: 'large',
      validation: [Validators.required]
    }, {
      name: 'componentName',
      label: 'Component Name',
      type: 'text',
      size: 'large',
      validation: [Validators.required]
    }, {
      name: 'partNo',
      label: 'partNo',
      type: 'text',
      size: 'large',
      validation: [Validators.required]
    },
    {
      name: 'ECN',
      label: 'ECN',
      type: 'text',
      size: 'large',
      validation: [Validators.required]
    }
  ]
  constructor(private fb: FormBuilder, private masterservice: MasterService) {
    this.componentList = [];
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
    if (this.formGroup.valid) {
      if (this.editid > 0) {
        this.masterservice.updateCompoent(this.formGroup.value, this.editid).subscribe({
          next: (x) => {
            confirm(x);
            this.Reset();
          },
          error: (err) => {
            const message = err.error?.text ?? err.error ?? err.message ?? 'An error occurred';
            confirm(typeof message === 'string' ? message : 'An error occurred');
          }
        });

      }
      else {
        this.masterservice.saveComponent(this.formGroup.value).subscribe({
          next: (x) => {
            confirm(x);
            this.Reset();
          },
          error: (err) => {
            const message = err.error?.text ?? err.error ?? err.message ?? 'An error occurred';
            confirm(typeof message === 'string' ? message : 'An error occurred');
          }
        })
      }

    }
  }

  Edit(id: number) {
    if (id > 0) {
      this.masterservice.getComponentById(id).subscribe({
        next: (x) => {
          this.formGroup.patchValue(x);
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
    debugger
    if (id > 0) {
      this.masterservice.deleteComponent(id).subscribe({
        next: (x) => {
          confirm(x);
          this.Reset();
        },
        error: (err) => {
          const message = err.error?.text ?? err.error ?? err.message ?? 'An error occurred';
          confirm(typeof message === 'string' ? message : 'An error occurred');
        }
      });
    }
  }
  Reset() {
    this.formGroup.reset();
    this.masterservice.getAllComponents().subscribe({
      next: (x) => {
        this.componentList = x;
        this.formGroup.controls['componentId'].setValue(this.componentList.length + 1);
      },
      error: (err) => {
        if (err.status === 200) {
          this.componentList = err;
        }
        else {
          const message = err.error?.text ?? err.error ?? err.message ?? 'An error occurred';
          confirm(typeof message === 'string' ? message : 'An error occurred');
        }
      }
    });
    this.editid = 0;
  }
}
