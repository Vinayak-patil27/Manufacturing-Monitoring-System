import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { faPlus, faTrash, faEdit, faPen } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/auth.service';
import { FormFieldConfig } from 'src/app/Shared/sharedform/form-field-config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup!: FormGroup;
  faPlus = faPlus;
  faTrash = faTrash;
  faEdit = faEdit;
  faPen = faPen;

  formConfig: FormFieldConfig[] = [
    {
      name: 'UserId',
      label: 'User ID',
      type: 'text',
      size: 'large',
      validation: [Validators.required]
    }, {
      name: 'password',
      label: 'Password',
      type: 'text',
      size: 'large',
      customClass:'password',
      validation: [Validators.required]
    }
  ]
  constructor(private fb: FormBuilder,private router: Router,private auth:AuthService) {
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
  login() {
     debugger 
    if(this.formGroup.value.UserId =="Admin" && this.formGroup.value.password == "123")
    {
     
    confirm("submit succesfull")
    localStorage.setItem("LoggedIn","qwerty")
    this.Reset();
     this.router.navigate(["/main"]);
    }
    else{
      alert("Please Check UserID and Password.")
    }
  }
  Reset()
  {
    this.formGroup.reset();
  }
}
