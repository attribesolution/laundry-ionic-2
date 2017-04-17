import { Directive, 
         Input, 
         OnChanges, 
         SimpleChanges 
        } from '@angular/core';
import { AbstractControl, 
         NG_VALIDATORS,
         Validator,
         ValidatorFn,
         Validators 
        } from '@angular/forms';
export function emailValidator(emailRegex: RegExp): ValidatorFn{
    return (control: AbstractControl): {[key: string]: any} =>{
        const email = control.value;
        // let emailRegex: RegExp;
        const no = emailRegex.test(email);
        if(email == '' ){
            return {'required': {email}}
        }else{
            return no ? null: { 'invalidEmail': {email}} ;
        }
        
        
    };
}


@Directive({
    selector: '[validateEmail]',
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: emailValidator,
        multi: true
    }]
})
export  class emailValidatorDirective implements Validator, OnChanges{
    @Input() testEmail: string;
    private valFn = Validators.nullValidator;

    ngOnChanges(changes: SimpleChanges){
        const change = changes['testEmail'];
        if(change){
            const val: string | RegExp = change.currentValue;
            const re = val instanceof RegExp ? val: new RegExp(val, 'i');
            this.valFn  = emailValidator(re);
        } else {
            this.valFn = Validators.nullValidator;
        }
    }
    validate(control: AbstractControl): {[key: string]: any}{
        return this.valFn(control);
    }
}