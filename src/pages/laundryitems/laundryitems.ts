import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component ({
    selector: 'laundry_items',
    templateUrl: 'laundryitems.html'
})

export class LaundryItems{
     constructor(private navCtrl: NavController){}
}