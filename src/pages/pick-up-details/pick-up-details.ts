import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { DropOffDetails } from '../drop-off-details/drop-off-details';

import { globalVars } from '../../app/globalvariables';

import { PickupService } from './pick-up.service';

import { PreGenModel } from '../../models/preGen.model'

@Component ({
    selector: 'pick-up-details',
    templateUrl: 'pick-up-details.html',
    providers: [PickupService]
})

export class PickUpDetails{
     @ViewChild('textarea') textarea: ElementRef;
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
    loc: Object;
    token: string;
    preGenData: PreGenModel;
    private pickupInstructions: string;
     dateArrayMaker(){
        for(let i = 0; i <= 9; i++)
            this.dates.push(new Date(Date.now() + 24*i*36e5));
     };
     constructor(public navCtrl: NavController, public navParams: NavParams, public pickupService: PickupService){
         this.dateArrayMaker();
         console.log(this.dates);
         console.log(this.hours, this.minutes);
         
         this.preGenData = navParams.get('preGenData');
         console.log(this.preGenData);
         this.loc = JSON.parse(localStorage.getItem("Location"));
         console.clear();
         console.log(navParams.get('preGenData'));
         console.log('Location: ', this.loc);
         this.token = localStorage.getItem('x-access-token');
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
            console.log(textareaValue);
            console.log("Next clicked!");
            let newDate = this.selectedDate.day.getFullYear() + ' ' + 
                                 Number(this.selectedDate.day.getMonth() + 1 )+ ' ' + 
                                 this.selectedDate.day.getDate() + ' ' +
                                 this.selectedDate.hour + ':' +
                                 this.selectedDate.minute + ' ' +
                                 this.selectedDate.amPm;
            let when = new Date(newDate)
            console.log('when: ', when);
            console.log('location: ', this.loc);
            // console.log(this.pickupInstructions);
            this.patchPickUpDetails(when, textareaValue);
            this.navCtrl.push(DropOffDetails, {
                preGenData: this.preGenData
            });
            
    }
    patchPickUpDetails(whenDate, textareaValue){
        console.log((this.loc as any).geometry.location.lat);
        
        let data = {
            pickupDetails: {
                location: {
                    lat: (this.loc as any).geometry.location.lat,
                    lng: (this.loc as any).geometry.location.lng,
                    address: (this.loc as any).formatted_address
                },
                when: whenDate,
                instruction: textareaValue
            }
        }
        let URL = globalVars.patchPickupApiURL((this.preGenData.data as any)._id);
        this.pickupService.hitPickupPatch(URL, data, this.token)
            .subscribe(res => console.log(res));
    }
}