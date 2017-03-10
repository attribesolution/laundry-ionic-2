import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component ({
    templateUrl: 'notifications.html'
})

export class NotificationComponent{
    

     
    
     constructor(private navCtrl: NavController){
    
     }

    save(){

        console.log("save clicked");
    }
}