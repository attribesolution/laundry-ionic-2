import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { DropOffDetails } from '../drop-off-details/drop-off-details';

import { globalVars } from '../../app/globalvariables';

import { PickupService } from './pick-up.service';

import { PreGenModel } from '../../models/preGen.model';

import { AuthService } from "../../auth/auth.service";

import { AlertDialogFactory } from "../../app/alert.dialog";

@Component ({
    selector: 'pick-up-details',
    templateUrl: 'pick-up-details.html',
    providers: [AuthService, 
                PickupService,
                AlertDialogFactory]
})

export class PickUpDetails{
    @ViewChild('textarea') textarea: ElementRef;
    today: Date = new Date();
    newDate: Date = new Date;
    locale: String = 'en-us';
    hours: number[] = Array.from(
        new Array(13),
        (val,index):number => {
            return index + 9 <= 12 ? index + 9: index - 3;
        });
    minutes: number[] = Array.from(new Array(60),(val,index)=>index)
    dates = [];
    amPm: String[] = ['AM', 'PM'];
    highlightedDay = new Date(Date.now());
    highlightedHour: number;
    highlightedMinute : number;
    highlightedAmPm: number;
    selectedDate = {
        day: new Date(),
        hour: 0,
        minute: null,
        amPm: 'AM'
    };
    lat; lng; address;
    loc: Object;
    token: string;
    preGenData: PreGenModel;
    private pickupInstructions: string;
     dateArrayMaker(){
        for(let i = 0; i <= 9; i++)
            this.dates.push(new Date(Date.now() + 24*i*36e5));
     };
     constructor(public navCtrl: NavController, 
                 public navParams: NavParams, 
                 public pickupService: PickupService,
                 private authservice: AuthService,
                 private alertCntrl: AlertDialogFactory){
         this.dateArrayMaker();
         console.log(this.dates);
         console.log(this.hours, this.minutes);
         console.log(this.highlightedDay);
         
         
         this.preGenData = navParams.get('preGenData');
         console.log(this.preGenData);
         this.loc = JSON.parse(localStorage.getItem("Location"));
        //  console.clear();
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
            this.highlightedDay = this.highlightedDay === Elementid ? 0 : Elementid :
        segment === 'hour' ? 
            this.highlightedHour = this.highlightedHour === Elementid ? 0 : Elementid :
        segment === 'minute' ? 
            this.highlightedMinute = this.highlightedMinute === Elementid ? 0 : Elementid :
        segment === 'amPm' ? 
            this.highlightedAmPm = this.highlightedAmPm === Elementid ? 0 : Elementid : null
     }
     startNextScreen(textareaValue){
            console.log(textareaValue);
            console.log("Next clicked!");
            let when, newDate;
            if(!(this.selectedDate.hour === 0) && !(this.selectedDate.minute === null)){
                newDate = this.selectedDate.day.getFullYear() + ' ' + 
                                 Number(this.selectedDate.day.getMonth() + 1 )+ ' ' + 
                                 this.selectedDate.day.getDate() + ' ' +
                                 this.selectedDate.hour + ':' +
                                 this.selectedDate.minute + ' ' +
                                 this.selectedDate.amPm;
                when = new Date(newDate);
                console.log('when: ', when);
                console.log('location: ', this.loc);
                // console.log(this.pickupInstructions);
                if(!!textareaValue){
                    this.patchPickUpDetails(when, textareaValue);
                    this.navCtrl.push(DropOffDetails, {
                        preGenData: this.preGenData
                    });
                }else{
                    this.alertCntrl.openAlertDialog("What's missing?", "Enter pickup details.");
                }
            }else{
                console.log(this.selectedDate)
                this.alertCntrl.openAlertDialog("What's missing?", "Please select time.");    
            }
            
            
    }
    patchPickUpDetails(whenDate, textareaValue){
        console.log((this.loc as any));
        if(this.loc['geometry']){
            this.lat = this.loc['geometry']['location']['lat'];
            this.lng = this.loc['geometry']['location']['lat'];
            this.address = this.loc['geometry']['location']['lat'];
        }else{
            this.lat = this.loc['lat'];
            this.lng = this.loc['lat'];
            this.address = this.loc['lat'];
        }
        let data = {
            pickupDetails: {
                location: {
                    lat: this.lat,
                    lng: this.lng,
                    address: this.address
                },
                when: whenDate,
                instruction: textareaValue
            }
        }
        let URL = globalVars.patchPickupApiURL((this.preGenData.data as any)._id);
        this.authservice.patchCall(URL, data)
            .subscribe(res => console.log(res));
    }
}