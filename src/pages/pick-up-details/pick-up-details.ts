import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { DropOffDetails } from '../drop-off-details/drop-off-details';

import { globalVars } from '../../app/globalvariables';

import { PickupService } from './pick-up.service'

@Component ({
    selector: 'pick-up-details',
    templateUrl: 'pick-up-details.html'
})

export class PickUpDetails{
     @ViewChild('textarea') textarea: ElementRef
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
    data;
    pickupInstructions: string;
     dateArrayMaker(){
        for(let i = 0; i <= 9; i++)
            this.dates.push(new Date(Date.now() + 24*i*36e5));
     };
     AfterViewInit(){
         this.loc = JSON.parse(localStorage.getItem("Location"));
     }
     constructor(public navCtrl: NavController, public navParams: NavParams, private pickupService: PickupService){
    
         this.dateArrayMaker();
         console.log(this.dates);
         console.log(this.hours, this.minutes);
         this.data = navParams.get('preGenData');
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
            console.log(this.pickupInstructions);
            this.navCtrl.push(DropOffDetails);
    }
    patchPickUpDetails(){
        let data = {
            pickupDetails: {
                location: {
                    lat: "1",
                    lng: "2",
                    address: "Attribe"
                },
                when: new Date(),
                instruction: "None"
            }
        }
        let URL = globalVars.patchPickupApiURL((this.data.data as any)._id  as string);
        this.pickupService.hitPickupPatch(URL, data)
    }
}