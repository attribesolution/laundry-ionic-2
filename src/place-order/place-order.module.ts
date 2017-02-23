import { NgModule } from '@angular/core'
import { IonicModule } from 'ionic-angular';
import { PlaceOrderComponent } from './place-order.component';
import { LaundryItems } from '../pages/laundryitems/laundryitems';


@NgModule({
    imports: [
        IonicModule.forRoot(PlaceOrderComponent)
    ],
    declarations: [PlaceOrderComponent,LaundryItems],
    entryComponents: [PlaceOrderComponent , LaundryItems],
    exports: [PlaceOrderComponent]
})

export class PlaceOrderModule{
    constructor(){}
}