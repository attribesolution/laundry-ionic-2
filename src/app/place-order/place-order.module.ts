import { NgModule } from '@angular/core'

import { PlaceOrderComponent } from './placeorder.component';

@NgModule({
    imports: [],
    declarations: [PlaceOrderComponent],
    entryComponents: [PlaceOrderComponent],
    exports: [PlaceOrderComponent]
})

export class PlaceOrderModule{
    constructor(){}
}