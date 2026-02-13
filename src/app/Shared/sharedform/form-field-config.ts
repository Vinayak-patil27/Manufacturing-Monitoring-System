import { ValidatorFn } from '@angular/forms';

export interface FormFieldConfig {
  name: string;
  label: string;
  type: 'text' | 'number' | 'email' | 'password' | 'select' | 'date' | 'textarea';
  value?: any;
  placeholder?: string;
  options?: { label: string, value: any }[]; // For dropdowns
  size?: 'small' | 'medium' | 'large' | 'full'; 
  color?: string;        // For label color
  customClass?: string;  // Extra CSS (e.g., 'mt-3', 'border-red')
  validation?: ValidatorFn[];
}