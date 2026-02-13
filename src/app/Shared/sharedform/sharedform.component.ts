import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormFieldConfig } from './form-field-config';

@Component({
  selector: 'app-sharedform',
  templateUrl: './sharedform.component.html',
  styleUrls: ['./sharedform.component.css']
})
export class SharedformComponent implements OnInit {
 @Input() config!: FormFieldConfig;
  @Input() group!: FormGroup;

  ngOnInit(): void {
  }
    
  get isInvalid() {
    if(!this.group) return false; // Safety check
    const control = this.group.get(this.config.name);
    return control?.touched && control?.invalid;
  }
}