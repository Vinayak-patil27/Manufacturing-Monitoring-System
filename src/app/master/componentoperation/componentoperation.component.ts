import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { faPlus, faTrash, faEdit, faPen } from '@fortawesome/free-solid-svg-icons';
import { FormFieldConfig } from 'src/app/Shared/sharedform/form-field-config';
import { Componentoperationmaster } from './componentoperationmaster';

@Component({
  selector: 'app-componentoperation',
  templateUrl: './componentoperation.component.html',
  styleUrls: ['./componentoperation.component.css']
})
export class ComponentoperationComponent implements OnInit {

 formGroup!:FormGroup;
  faPlus = faPlus;
    faTrash = faTrash;
    faEdit = faEdit;
    faPen = faPen;
    compopeactonList:Componentoperationmaster[];
 
  formConfig:FormFieldConfig[]=[
   {
     name:'ComponentId',
     label:'Component Id',
     type:'number',
     size:'large',
     validation:[Validators.required]
   },{
     name:'MachineId',
     label:'Machine Id',
     type:'number',
     size:'large',
     validation:[Validators.required]
   },{
     name:'OperationCode',
     label:'Operation Code',
     type:'text',
     size:'large',
     validation:[Validators.required]
   },{
     name:'OperationName',
     label:'Operation Name',
     type:'number',
     size:'large',
     validation:[Validators.required]
   },{
     name:'OperationDescription',
     label:'Operation Description',
     type:'textarea',
     size:'large',
     validation:[]
   },
   {
     name:'OperationType',
     label:'Operation Type',
     type:'text',
     size:'large',
     validation:[Validators.required]
   }
  ]
   constructor(private fb :FormBuilder) { 
    this.compopeactonList=[];
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
    const selectedComponent = this.compopeactonList.find(x => x.componentId === id);
    debugger
    if (selectedComponent) {
      this.formGroup.patchValue(selectedComponent);
    }
  }

  Delete(id: number) {
    this.compopeactonList = this.compopeactonList.filter(x => x.componentId != id);
    this.Reset();
  }
  Reset()
  {
    this.formGroup.reset();
  }
}
