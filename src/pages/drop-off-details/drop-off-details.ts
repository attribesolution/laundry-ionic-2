import { Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AuthService } from "../../auth/auth.service";
import { globalVars } from '../../app/globalvariables';
import { PreGenModel } from '../../models/preGen.model';
import { OrderPlaced } from '../order-placed/order-placed';
import { DropOffService } from './drop-off-details.service';
import { OrderSummaryPage } from './../order-summary/order-summary';

import { AlertDialogFactory } from "./../../app/alert.dialog";

@Component ({
    selector: 'drop-off-details',
    templateUrl: 'drop-off-details.html',
    providers: [AuthService,
        DropOffService,
        AlertDialogFactory]
})

export class DropOffDetails{
     today: string;
     dropOffTime;
     minDate;
     maxDate;
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
     preGenData: PreGenModel;
     lat; lng; address; 
     loc: Object;
     token: string;
     ls;
     dateArrayMaker(){
        for(let i = 0; i <= 9; i++)
            this.dates.push(new Date(Date.now() + 24*i*36e5));
     };
     charcount: Number = 0;
     constructor(private navCtrl: NavController, 
                 public navParams: NavParams, 
                 public dropOffService: DropOffService,
                 private authService: AuthService,
                 private alertCntrl: AlertDialogFactory){ 
                    
        this.minDate = new Date(this.navParams.get('pickUpDate'));
        console.log('64', this.minDate);
        this.minDate.setDate(this.minDate.getDate() + 2);
        this.maxDate = new Date();
        this.maxDate.setYear(this.maxDate.getFullYear() + 1);

        console.log(this.maxDate);
        this.maxDate = this.maxDate.toISOString().slice(0, 10);
        //  console.log(this.navParams.get('pickUpDate'));
         console.log(this.minDate.toISOString());
         this.minDate = this.minDate.toISOString().slice(0, 10);
         this.today = this.minDate;
         
        //  console.log(this.minDate); 
         
         this.dateArrayMaker();
         console.log(this.dates);
         console.log(this.hours, this.minutes);
         this.preGenData = this.navParams.get('preGenData');
         this.loc = JSON.parse(localStorage.getItem("Location"));
        //  console.clear();
         console.log(navParams.get('preGenData'));
         console.log('Location: ', this.loc);
         this.token = localStorage.getItem('x-access-token');
     }
     onTextEnter(value){
        this.charcount = value.length
        console.log(value.length);
        
      }
     checkDate(today){
         console.log(today);
         let monthsList = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
         let dropOffDate = new Date(today);
         let pickUpDate = new Date(this.navParams.get('pickUpDate'));    
         let timeDifference = Math.abs(dropOffDate.getTime() - pickUpDate.getTime());
         let DaysDifference= Math.ceil(timeDifference / (1000 * 3600 *24));
         console.log(dropOffDate, pickUpDate, DaysDifference);
         console.log(dropOffDate.getTime(), pickUpDate.getTime(), timeDifference);
         if(pickUpDate.getFullYear() > dropOffDate.getFullYear() && pickUpDate.getMonth() > dropOffDate.getMonth() || (pickUpDate.getFullYear() == dropOffDate.getFullYear() && pickUpDate.getMonth() == dropOffDate.getMonth() && 
            (dropOffDate.getDate() - pickUpDate.getDate() < 2))){
                this.alertCntrl.openAlertDialog("What's wrong?", `Your pickup date is ${monthsList[dropOffDate.getMonth()], dropOffDate.getDate()}. The earliest drop-off you can select is mm:dd`);                
            }
     }

     getClassofDate(e){

     }
     toggleHighlight(Elementid: any, segment: string){
        console.clear();
        console.log(Elementid);
        this.selectedDate[segment] = Elementid;
        console.log(this.selectedDate);
        
        
        segment === 'day' ?  
            this.highlightedDay = this.highlightedDay === Elementid ?  0 : this.highlightedDay = Elementid : 
        segment === 'hour' ?  
            this.highlightedHour === Elementid ? this.highlightedHour = 0 : this.highlightedHour = Elementid : 
        segment === 'minute' ?  
            this.highlightedMinute === Elementid ? this.highlightedMinute = 0 : this.highlightedMinute = Elementid : 
        segment === 'amPm' ?  
            this.highlightedAmPm === Elementid ? this.highlightedAmPm = 0 : this.highlightedAmPm = Elementid : ''; 
    }
     startNextScreen(textareaValue){
            console.log("Next clicked!");
            let when, newDate; 
            if(!(this.dropOffTime == undefined)){ 
                let today = new Date(this.today.slice(0,10));
                this.dropOffTime =  this.dropOffTime.slice(0,2);
                newDate = this.selectedDate.day.getFullYear() + ' ' +                                   
                                 Number(this.selectedDate.day.getMonth() + 1 )+ ' ' + 
                                 this.selectedDate.day.getDate() + ' ' +
                                 this.selectedDate.hour + ':' +
                                 this.selectedDate.minute + ' ' +
                                 this.selectedDate.amPm; 
                when = new Date(today.getFullYear(), today.getMonth(), today.getDate(), Number(this.dropOffTime)); 
                console.log('when: ', when); 
                console.log('location: ', this.loc); 
                // console.log(this.pickupInstructions); 
                if(!!textareaValue){ 
                    this.patchDropOffDetails(when, textareaValue); 
                    this.navCtrl.push(OrderSummaryPage, { 
                        preGenData: this.preGenData
                    }); 
                }else{ 
                    this.alertCntrl.openAlertDialog("What's missing?", "Enter dropoff details."); 
                } 
            }else{ 
                this.alertCntrl.openAlertDialog("What's missing?", "Please select time.");     
            } 

    }

    patchDropOffDetails(whenDate, textareaValue){
        localStorage.setItem('dates', JSON.stringify({
            pickUpDate: this.navParams.get('pickUpDate'),
            dropOffDate: whenDate
        }));
        // console.log((this.loc as any).geometry.location.lat);
        if(this.loc['gemetry']){
            this.lat = this.loc['gemetry']['location']['lat'];
            this.lng = this.loc['gemetry']['location']['lng'];
            this.address = this.loc['gemetry']['location']['address'];
        }else{
            this.lat = this.loc['lat'];
            this.lng = this.loc['lng'];
            this.address = this.loc['address'];
        }
        let data = {
            dropoffDetails: {
                location: {

                    lat: this.lat, 
                    lng: this.lng, 
                    address: this.address 

                },
                when: whenDate,
                instruction: textareaValue
            }
        }
        
        let URL = globalVars.patchDropOffApiURL((this.preGenData.data as any)._id);
        this.authService.patchCall(URL, data)
            .subscribe(res => console.log(res));
    }
}