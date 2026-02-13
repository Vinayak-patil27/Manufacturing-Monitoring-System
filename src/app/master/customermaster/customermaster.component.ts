import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { faPlus, faTrash, faEdit, faPen } from '@fortawesome/free-solid-svg-icons';
import { FormFieldConfig } from 'src/app/Shared/sharedform/form-field-config';
import { Customermaster } from './customermaster';

@Component({
  selector: 'app-customermaster',
  templateUrl: './customermaster.component.html',
  styleUrls: ['./customermaster.component.css']
})
export class CustomermasterComponent implements OnInit {
formGroup!:FormGroup;
  faPlus = faPlus;
  faTrash = faTrash;
  faEdit = faEdit;
  faPen = faPen;
   customerList:Customermaster[];

 formConfig:FormFieldConfig[]=[
  {
    name:'Cusotmerid',
    label:'Cusotmer ID',
    type:'number',
    size:'large',
    validation:[Validators.required]
  },
  {
    name:'CusotmerName',
    label:'Cusotmer Name',
    type:'text',
    size:'large',
    validation:[Validators.required]
  }
 ]
  constructor(private fb :FormBuilder) {
    this.customerList=[];
   }

  ngOnInit(): void {
    this.formGroup=this.generateForm();
  }
generateForm(){
  const group=this.fb.group({});
  this.formConfig.forEach(field => {
    group.addControl(field.name,this.fb.control(field.value||'',field.validation));
  } );
  return group;
}

  Save() {
    confirm("submit succesfull")
    this.Reset();
  }

  Edit(id: number) {
    const selectedComponent = this.customerList.find(x => x.Cusotmerid === id);
    if (selectedComponent) {
      this.formGroup.patchValue(selectedComponent);
    }
  }

  Delete(id: number) {
    this.customerList = this.customerList.filter(x => x.Cusotmerid != id);
    this.Reset();
  }
  Reset()
  {
    this.formGroup.reset();
  }
}
