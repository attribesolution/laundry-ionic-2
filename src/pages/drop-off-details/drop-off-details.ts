import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import {OrderPlaced} from '../order-placed/order-placed';

import { globalVars } from '../../app/globalvariables';

import { PreGenModel } from '../../models/preGen.model';

import { DropOffService } from './drop-off-details.service';

import { OrderSummaryPage } from './../order-summary/order-summary';
@Component ({
    selector: 'drop-off-details',
    templateUrl: 'drop-off-details.html',
    providers: [DropOffService]
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
     preGenData: PreGenModel;
     loc: Object;

     dateArrayMaker(){
        for(let i = 0; i <= 9; i++)
            this.dates.push(new Date(Date.now() + 24*i*36e5));
     };
    
     constructor(private navCtrl: NavController, public navParams: NavParams, public dropOffService: DropOffService){
    
         this.dateArrayMaker();
         console.log(this.dates);
         console.log(this.hours, this.minutes);
         this.preGenData = this.navParams.get('preGenData');
         this.loc = JSON.parse(localStorage.getItem("Location"));
        //  console.clear();
         console.log(navParams.get('preGenData'));
         console.log('Location: ', this.loc);
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
     startNextScreen(textareaValue){
            console.log("Next clicked!");
            let newDate = this.selectedDate.day.getFullYear() + ' ' + 
                                 Number(this.selectedDate.day.getMonth() + 1 )+ ' ' + 
                                 this.selectedDate.day.getDate() + ' ' +
                                 this.selectedDate.hour + ':' +
                                 this.selectedDate.minute + ' ' +
                                 this.selectedDate.amPm
            console.log(new Date(newDate));
            let when = new Date(newDate);
            this.patchDropOffDetails(when, textareaValue);
            this.navCtrl.setRoot(OrderSummaryPage)
    }

    patchDropOffDetails(whenDate, textareaValue){
        console.log((this.loc as any).geometry.location.lat);
        
        let data = {
            dropoffDetails: {
                location: {
                    lat: (this.loc as any).geometry.location.lat || 0.0,
                    lng: (this.loc as any).geometry.location.lng || 0.0,
                    address: (this.loc as any).formatted_address || 'ABC'
                },
                when: whenDate,
                instruction: textareaValue
            }
        }
        let URL = globalVars.patchDropOffApiURL((this.preGenData.data as any)._id);
        this.dropOffService.hitDropOffPatch(URL, data)
            .subscribe(res => console.log(res));
    }
}