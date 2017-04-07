import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable'
import { globalVars } from '../../app/globalvariables';
import { NotificationsService } from './notifications.service';
import { NotificationModel } from '../../models/notification.model'
@Component ({
    templateUrl: 'notifications.html',
    providers: [NotificationsService]
})

export class NotificationComponent{
    
    notificationData:any;
    getNotificationSettings(){
        let userID = localStorage.getItem('userID');
        let URL = globalVars.NotificationSettingsURL(userID);
        this.notificationsService.getNotificationSettings(URL)
            .subscribe(res => {
                if(res.status == 200){
                    console.log(JSON.stringify(res['_body'])['data']);
                }
            })
    }
    app = {
        name: 'appNotification',
        checked: true,
        disabled: false,
        htmlValue: 'Send app notifications'
    };
    sms =  {
        name: 'smsNotification',
        checked: true,
        disabled: false,
        htmlValue: 'Send order notifications'
    }; 
    email = {
        name: 'emailNotification',
        checked: true,
        disabled: false,
        htmlValue: 'Send email notifications'
    };
    promo = {
        name: 'promoNotification',
        checked: false,
        disabled: true,
        htmlValue: 'Send app promo'
    }
    notifications = [
        this.app,
        this.sms, 
        this.email,
        this.promo 
    ]
     toggle1: boolean = false;
     smsNotifications: boolean;
     emailNotifications: boolean;
     appPromo: boolean;
     notificationSetting: NotificationModel;
    
     constructor(private navCtrl: NavController, private toastCtrl: ToastController, private notificationsService: NotificationsService){
        this.getNotificationSettings();
     }

     appNotification(value){
        console.log(value);
     }
     
     presentToast = () =>{
         let toast = this.toastCtrl.create({
             message: 'Notifications settings updated.',
             duration: 2500,
             position: 'bottom',
             cssClass: 'toastBg'
         });
         toast.onDidDismiss(() => {
             console.log('Dismissed Toast.');
         });   
        toast.present();
     }

    save(grnl, ordr, email, promo){
        let userID = localStorage.getItem('userID');
        console.log(userID);
        let URL = globalVars.NotificationSettingsURL(userID);
        let data = {
            generalNotification: grnl,
            orderNotification: ordr,
            emailNotification: email,
            promoNotification: promo
        }

        let settings = {
            settings : data
        }
        this.notificationsService.putNotificationsSettings(URL, settings).
            subscribe(res => {
                if(res.status == 200){
                    console.log(res['_body']);
                    
                }
            });
        this.presentToast();
        console.log("save clicked");
    }

    /**
     * Author: Muhammad Shahab
     * Date: 6 apr 2017
     * Usage: get the response from server of notification settings user saved before
     */
    getNotificatinSettings()
    {
        let userID = localStorage.getItem('userID');
        console.log(userID);
        let URL = globalVars.NotificationSettingsURL(userID);
        this.notificationsService.getNotificationSettings(URL).subscribe(res=>{
            if(res.status == 200){
                this.notificationSetting = res.json();

                // set the boolean values of notification settings 
                this.app.checked = this.notificationSetting.data.settings.generalNotification;
                this.sms.checked = this.notificationSetting.data.settings.orderNotification;
                this.email.checked = this.notificationSetting.data.settings.emailNotification;
                this.promo.checked = this.notificationSetting.data.settings.promoNotification;
            }
        });
    }
}