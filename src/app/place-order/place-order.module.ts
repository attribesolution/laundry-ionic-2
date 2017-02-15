import { NgModule } from '@angular/core'
import { IonicModule } from 'ionic-angular';
import { PlaceOrderComponent } from './place-order.component';

@NgModule({
    imports: [
        IonicModule.forRoot(PlaceOrderComponent),
    ],
    declarations: [PlaceOrderComponent],
    entryComponents: [PlaceOrderComponent],
    exports: [PlaceOrderComponent]
})

export class PlaceOrderModule{
    constructor(){}
}