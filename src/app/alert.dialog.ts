import { Injectable,Component } from '@angular/core';
import { AlertController } from 'ionic-angular';

/**
 * Author: Muhammad Shahab
 * Date: 13 Apr 2017
 * Description: It creates different types of dialog
 */
@Injectable()
export class AlertDialogFactory {
    constructor(private alertCtrl: AlertController) {

    }

    openAlertDialog(title: string, msg: string) {
        let alert = this.alertCtrl.create({
            title: title,
            message: msg,
            cssClass:'alert-dialog',
            buttons: ['Ok']
        });
        alert.present();
    }

}
