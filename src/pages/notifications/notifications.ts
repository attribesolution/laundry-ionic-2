import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable'

@Component ({
    templateUrl: 'notifications.html'
})

export class NotificationComponent{
    

     toggle1: boolean = false;
     smsNotifications: boolean;
     emailNotifications: boolean;
     appPromo: boolean;
    
     constructor(private navCtrl: NavController){
        
     }

     toggle(value){
         console.log(value);
         value = !value;
     }

     appNotification(value){
        console.log(value);
     }
     appClick(){
         console.log('Working');
     }

    save(){

        console.log("save clicked");
    }
}