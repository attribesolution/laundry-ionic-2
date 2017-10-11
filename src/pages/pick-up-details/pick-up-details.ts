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
    minDate: string = new Date().toISOString().slice(0,10);
    maxDate;
    today: string = new Date().toISOString(); 
    pickerTime;
    newDate: Date = new Date(); 
    locale: String = 'en-us'; 
    hours: string[] = Array.from( 
        new Array(13), 
        (val,index):string => { 
            return index + 9 <= 12 ? index + 9 + ' AM': index - 3 + ' PM';
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
    pickupInstructions: string;
     dateArrayMaker(){
        for(let i = 0; i <= 9; i++)
            this.dates.push(new Date(Date.now() + 24*i*36e5));
     };
     charcount = 0;
     constructor(public navCtrl: NavController, 
                 public navParams: NavParams, 
                 public pickupService: PickupService,
                 private authservice: AuthService,
                 private alertCntrl: AlertDialogFactory){
         this.dateArrayMaker();
         this.maxDate = new Date();
         this.maxDate.setYear(this.maxDate.getFullYear() + 1);
         console.log(this.maxDate);
         this.maxDate = this.maxDate.toISOString().slice(0, 10);
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
     onTextEnter(value){
        this.charcount = value.length
        console.log(value);
        
      }
     
    //  toggleHighlight(Elementid: any, segment: string){
    //     console.clear();
    //     console.log(Elementid);
    //     this.selectedDate[segment] = Elementid;
    //     console.log(this.selectedDate);
        
        
    //     segment === 'day' ? 
    //         this.highlightedDay = this.highlightedDay === Elementid ? 0 : Elementid :
    //     segment === 'hour' ? 
    //         this.highlightedHour = this.highlightedHour === Elementid ? 0 : Elementid :
    //     segment === 'minute' ? 
    //         this.highlightedMinute = this.highlightedMinute === Elementid ? 0 : Elementid :
    //     segment === 'amPm' ? 
    //         this.highlightedAmPm = this.highlightedAmPm === Elementid ? 0 : Elementid : null
    //  }
     startNextScreen(textareaValue){
         console.log(this.pickerTime);
                  
            console.log(textareaValue);
            console.log("Next clicked!");
            let when, newDate; 
            if(!(this.pickerTime == undefined)){ 
                let today = new Date(this.today.slice(0,10));
                this.pickerTime = this.pickerTime.slice(0,2);
                console.log(today, this.pickerTime, this.today);
                // newDate = this.selectedDate.day.getFullYear() + ' ' +  

                //                  Number(this.selectedDate.day.getMonth() + 1 )+ ' ' + 
                //                  this.selectedDate.day.getDate() + ' ' +
                //                  this.selectedDate.hour + ':' +
                //                  this.selectedDate.minute + ' ' +
                //                  this.selectedDate.amPm;
            when = new Date(today.getFullYear(), today.getMonth(), today.getDate(), Number(this.pickerTime)) 
                console.log('when: ', when); 
                console.log('location: ', this.loc); 
                // console.log(this.pickupInstructions); 
                if(!!textareaValue){ 
                    this.patchPickUpDetails(when, textareaValue); 
                    this.navCtrl.push(DropOffDetails, { 
                        preGenData: this.preGenData,
                        pickUpDate: when
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
            this.lng = this.loc['geometry']['location']['lng']; 
            this.address = this.loc['geometry']['location']['address']; 
        }else{ 
            this.lat = this.loc['lat']; 
            this.lng = this.loc['lng']; 
            this.address = this.loc['address']; 
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