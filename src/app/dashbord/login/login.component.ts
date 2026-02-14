import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { faPlus, faTrash, faEdit, faPen } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/auth/auth.service';
import { FormFieldConfig } from 'src/app/Shared/sharedform/form-field-config';
import { ServiceService } from '../service.service';

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
      customClass: 'password',
      validation: [Validators.required]
    }
  ]
  constructor(private fb: FormBuilder, private router: Router, private auth: AuthService, private service: ServiceService) {
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
      this.service.login(this.formGroup.value.UserId, this.formGroup.value.password).subscribe({
        next: (x) => {
          if (x) {
            confirm("submit succesfull");
            localStorage.setItem("token", x.toString());
            this.Reset();
            this.router.navigate(["/main"]);
          } else {
            alert("Please Check UserID and Password.");
          }
        },
        error: (err) => {
          const message = err.error?.text ?? err.error ?? err.message ?? 'An error occurred';
          if (err) {
            confirm("submit succesfull");
            localStorage.setItem("token", err.toString());
            this.Reset();
            this.router.navigate(["/main"]);
          } else {
            alert("Please Check UserID and Password.");
          }
      }});

    }
    Reset()
    {
      this.formGroup.reset();
    }
  }
