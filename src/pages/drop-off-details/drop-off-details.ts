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
     locale: String = 'en-us';
     hours: number[] = Array.from(new Array(12),(val,index)=>index+1);
     minutes: number[] = Array.from(new Array(60),(val,index)=>index)
     dates = [];
     amPm: String[] = ['AM', 'PM'];
     highlightedDay: number;
     highlightedHour: number;
     highlightedMinute : number;
     highlightedAmPm: number;
     selectedDate = {
        day: new Date(),
        hour: 0,
        minute: 0,
        amPm: 'AM'
     };

     dateArrayMaker(){
        for(let i = 0; i <= 9; i++)
            this.dates.push(new Date(Date.now() + 24*i*36e5));
     };
    
     constructor(private navCtrl: NavController){
    
         this.dateArrayMaker();
         console.log(this.dates);
         console.log(this.hours, this.minutes);
     }

     getClassofDate(e){

     }
     toggleHighlight(Elementid: any, segment: string){
        console.clear();
        console.log(Elementid);
        this.selectedDate[segment] = Elementid;
        console.log(this.selectedDate);
        
        
        segment === 'day' ? 
            this.highlightedDay === Elementid ? this.highlightedDay = 0 : this.highlightedDay = Elementid :
        segment === 'hour' ? 
            this.highlightedHour === Elementid ? this.highlightedHour = 0 : this.highlightedHour = Elementid :
        segment === 'minute' ? 
            this.highlightedMinute === Elementid ? this.highlightedMinute = 0 : this.highlightedMinute = Elementid :
        segment === 'amPm' ? 
            this.highlightedAmPm === Elementid ? this.highlightedAmPm = 0 : this.highlightedAmPm = Elementid : '';
    }
     startNextScreen(){
            this.navCtrl.push(OrderPlaced);
            console.log("Next clicked!");
            let newDate = this.selectedDate.day.getFullYear() + ' ' + 
                                 Number(this.selectedDate.day.getMonth() + 1 )+ ' ' + 
                                 this.selectedDate.day.getDate() + ' ' +
                                 this.selectedDate.hour + ':' +
                                 this.selectedDate.minute + ' ' +
                                 this.selectedDate.amPm
            console.log(new Date(newDate));
    }
}