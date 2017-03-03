import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import {OrderPlaced} from '../order-placed/order-placed';

@Component ({
    selector: 'drop-off-details',
    templateUrl: 'drop-off-details.html'
})

export class DropOffDetails{
     today: Date = new Date();
     newDate: Date = new Date;
     locale = 'en-us';
     dates = [];
     highlightedDiv: number;
    dateArrayMaker(){
        for(let i = 0; i <= 9; i++)
            this.dates.push(new Date(Date.now() + 24*i*36e5));
    };
    
     constructor(private navCtrl: NavController){
    
         this.dateArrayMaker();
         console.log(this.dates);
     }

     getClassofDate(e){

     }
     toggleHighlight(newValue: number){
         if (this.highlightedDiv === newValue) {
            this.highlightedDiv = 0;
        }
        else {
            this.highlightedDiv = newValue;
        }
     }
     startNextScreen()
        {
            this.navCtrl.push(OrderPlaced);
            console.log("Next clicked!");
        }
}