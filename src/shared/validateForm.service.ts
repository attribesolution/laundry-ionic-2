import { 
        Injectable
    } from '@angular/core';
import { FormGroup } from '@angular/forms';
@Injectable()
export class ValidateFormService{
    constructor(){}

    validateForm(formToValidate: FormGroup){
    
    if (formToValidate) {return;}
    const form = formToValidate;
    
    for(const field in this.formsError){
      const control = form.get(field);
      
      if(control){
        this.formsError[field] = '';
        const messages = this.validationMessages[field];
        for (const key in control.errors){  
          console.log(control.errors);
          this.formsError[field] = messages[key];
        }
      }
    }
  }

  formsError = {
    firstname: '',
    lastname: '',
    password: '',
    phone: '',
    email: '',
    dob: ''
  }

  validationMessages = {
    firstname:{
      'required': 'First name is required.',
      'minLength': 'First name should contain atleast 4 characters',
      'maxlength': 'First name should be less than 36 characters'
    },
    lastname:{
      'required': 'Last name is required.',
      'minLength': 'Last name should contain atleast 4 characters',
      'maxlength': 'Last name should be less than 36 characters'
    },
    password: {
      'required': 'Password is required.',
      'minlength': 'Password should contain atleast 4 characters',
      'maxlength': 'Password should be less than 36 characters'
    },
    phone:{
      'required': 'Phone number is required.',
    },
    email: {
      'required': 'Email is required.',
      'invalidEmail': 'Invalid Email address.'
    },
    dob:{
      'required': 'Date of Birth is required.',
    }
  }

}