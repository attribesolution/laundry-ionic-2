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

    openAlertDialog(title: string, msg: string, map?) {
        // map.setClickable(false);
        console.log(map);
        
        let alert = this.alertCtrl.create({
            title: title,
            message: msg,
            buttons: ['Ok'],
            cssClass: 'alertTop'
        });
        alert.present();
        alert.onDidDismiss(() => {
            // map.setClickable(true);
        })
    }
    selected:any;

    radioAlertDialog(title: string, inputs){
        let dataReturned = null;
        let alert = this.alertCtrl.create({
            title: title,
            cssClass: 'alertTop'
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

        alert.present();
        alert.onDidDismiss((data) => {

            console.log('OnDidDismiss', data); 
            dataReturned = data; 
            return data || 'null'; 

        });
        return dataReturned;
    }

}
