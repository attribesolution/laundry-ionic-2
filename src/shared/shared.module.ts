import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { emailValidatorDirective } from './email-validation.directive';

@NgModule({
    declarations: [ 
        emailValidatorDirective
    ],
    imports: [ CommonModule ],
    exports: [ 
        emailValidatorDirective
        ]
})
export class SharedModule{
}