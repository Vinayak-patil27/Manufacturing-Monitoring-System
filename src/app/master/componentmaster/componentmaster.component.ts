import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { faPlus, faTrash, faEdit, faPen } from '@fortawesome/free-solid-svg-icons';
import { FormFieldConfig } from 'src/app/Shared/sharedform/form-field-config';
import { Componentmaster } from './componentmaster';

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

  formConfig: FormFieldConfig[] = [
    {
      name: 'ComponentId',
      label: 'Component Id',
      type: 'number',
      size: 'large',
      validation: [Validators.required]
    }, {
      name: 'CustomerId',
      label: 'Customer Id',
      type: 'number',
      size: 'large',
      validation: [Validators.required]
    }, {
      name: 'ComponentName',
      label: 'Component Name',
      type: 'text',
      size: 'large',
      validation: [Validators.required]
    }, {
      name: 'PartNo',
      label: 'PartNo',
      type: 'number',
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
  constructor(private fb: FormBuilder) {
    this.componentList = [
      {
    ComponentId: 1,
    CustomerId: 101,
    ComponentName: 'Gear Shaft',
    PartNo: 5001,
    ECN: 'ECN-001'
  },
  {
    ComponentId: 2,
    CustomerId: 102,
    ComponentName: 'Hydraulic Housing',
    PartNo: 5002,
    ECN: 'ECN-002'
  },
  {
    ComponentId: 3,
    CustomerId: 103,
    ComponentName: 'Bearing Cap',
    PartNo: 5003,
    ECN: 'ECN-003'
  },
  {
    ComponentId: 4,
    CustomerId: 101,
    ComponentName: 'Drive Flange',
    PartNo: 5004,
    ECN: 'ECN-004'
  },
  {
    ComponentId: 5,
    CustomerId: 104,
    ComponentName: 'Spindle Adapter',
    PartNo: 5005,
    ECN: 'ECN-005'
  },
  {
    ComponentId: 6,
    CustomerId: 105,
    ComponentName: 'Valve Body',
    PartNo: 5006,
    ECN: 'ECN-006'
  },
  {
    ComponentId: 7,
    CustomerId: 106,
    ComponentName: 'Control Arm',
    PartNo: 5007,
    ECN: 'ECN-007'
  },
  {
    ComponentId: 8,
    CustomerId: 102,
    ComponentName: 'Pump Rotor',
    PartNo: 5008,
    ECN: 'ECN-008'
  },
  {
    ComponentId: 9,
    CustomerId: 107,
    ComponentName: 'Coupling Hub',
    PartNo: 5009,
    ECN: 'ECN-009'
  },
  {
    ComponentId: 10,
    CustomerId: 101,
    ComponentName: 'Slide Plate',
    PartNo: 5010,
    ECN: 'ECN-010'
  }];
  }

  ngOnInit(): void {
    this.formGroup = this.generateForm();
  }
  generateForm() {
    const group = this.fb.group({});
    this.formConfig.forEach(field => {
      group.addControl(field.name, this.fb.control(field.value || '', field.validation));
    });
    return group;
  }

  Save() {
    confirm("submit succesfull")
    this.Reset();
  }

  Edit(id: number) {
    const selectedComponent = this.componentList.find(x => x.ComponentId === id);
    debugger
    if (selectedComponent) {
      this.formGroup.patchValue(selectedComponent);
    }
  }

  Delete(id: number) {
    this.componentList = this.componentList.filter(x => x.ComponentId != id);
    this.Reset();
  }
  Reset()
  {
    this.formGroup.reset();
  }
}
