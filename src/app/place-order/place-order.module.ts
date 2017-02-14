import { NgModule } from '@angular/core'
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
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