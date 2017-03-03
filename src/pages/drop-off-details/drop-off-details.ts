import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component ({
    selector: 'drop-off-details',
    templateUrl: 'drop-off-details.html'
})

export class DropOffDetails{
     today: Date = new Date();
     newDate: Date = new Date;
     locale: String = 'en-us';
     hours: number[] = Array.from(new Array(12),(val,index)=>index+1);
     minutes: number[] = Array.from(new Array(60),(val,index)=>index)
     dates = [];
     amPm: String[] = ['AM', 'PM'];
     highlightedDiv: number;

     dateArrayMaker(){
        for(let i = 0; i <= 9; i++)
            this.dates.push(new Date(Date.now() + 24*i*36e5));
     };
    
     constructor(){
    
         this.dateArrayMaker();
         console.log(this.dates);
         console.log(this.hours, this.minutes);
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
}