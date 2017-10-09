import { OrderPlaced } from './../order-placed/order-placed';
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';
@Component({
    selector: 'loader',
    templateUrl: './loader.html'
})
export class LoaderComponent{
    constructor(private navCntrl: NavController) {
        
    }
    ionViewDidLoad(){
        setTimeout(() => {
            this.navCntrl.setRoot(OrderPlaced);
        }, 5000);
    }
}