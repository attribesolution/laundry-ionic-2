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
            buttons: ['Ok']
        });
        alert.present();
    }
    selected:any;
    checkBoxAlertDialog(title: string, inputs){
        let alert = this.alertCtrl.create({
            title: title,
        });

        inputs.forEach(input => {
            alert.addInput({
                type: 'radio',
                label: input.alias,
                value: input,
                checked: false
            });
        });
        alert.addButton({ 
            text: 'Cancel', 
            handler: () => { 
                console.log('Cancel clicked.'); 
                 
            } 
        }); 
        alert.addButton({
            text: 'Okay',
            handler: data => {
                console.log('Radio data:', data);
                // this.testCheckboxOpen = false;
                // this.testCheckboxResult = data;
            }
        });
        let dataReturned;
        alert.present();
        alert.onDidDismiss((data) => {
            console.log('OnDidDismiss', data); 
            dataReturned = data; 
            return data || 'null'; 
        });
        return dataReturned;
    }

}
