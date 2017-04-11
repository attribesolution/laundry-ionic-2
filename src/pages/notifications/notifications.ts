import { Component } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable'
import { globalVars } from '../../app/globalvariables';
import { NotificationsService } from './notifications.service';
import { NotificationModel } from '../../models/notification.model'
import { Storage } from '@ionic/storage'
@Component({
    templateUrl: 'notifications.html',
    providers: [NotificationsService]
})

export class NotificationComponent {

    notificationData: any;

    app = {
        name: 'appNotification',
        checked: true,
        disabled: false,
        htmlValue: 'Send app notifications'
    };
    sms = {
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

    constructor(private storage: Storage, private navCtrl: NavController, private toastCtrl: ToastController, private notificationsService: NotificationsService) {

        this.getNotificatinSettings();


    }

    appNotification(value) {
        console.log(value);
    }

    presentToast = () => {
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

    save(grnl, ordr, email, promo) {
        let userID = localStorage.getItem('userID');
        let token = localStorage.getItem('x-access-token');
        console.log(userID);
        let URL = globalVars.NotificationSettingsURL(userID);
        let data = {
            generalNotification: grnl,
            orderNotification: ordr,
            emailNotification: email,
            promoNotification: promo
        }

        let settings = {
            settings: data
        }
        this.notificationsService.putNotificationsSettings(URL, settings,token).
            subscribe(res => {
                if (res.status == 200) {
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
    getNotificatinSettings() {
        let token = localStorage.getItem('x-access-token');
        let userID = localStorage.getItem('userID');

        console.log("User Id",userID);

        let URL = globalVars.NotificationSettingsURL(userID);
        this.notificationsService.getNotificationSettings(URL, token).subscribe(res => {
            if (res.status == 200) {
                console.log(res.json());
                this.notificationSetting = res.json();

                if (this.notificationSetting.data != null) {
                    // set the boolean values of notification settings 
                    this.app.checked = this.notificationSetting.data.settings.generalNotification;
                    this.sms.checked = this.notificationSetting.data.settings.orderNotification;
                    this.email.checked = this.notificationSetting.data.settings.emailNotification;
                    this.promo.checked = this.notificationSetting.data.settings.promoNotification;
                }
                else {
                    console.log("Data is null");
                }
            }
        });
    }
}