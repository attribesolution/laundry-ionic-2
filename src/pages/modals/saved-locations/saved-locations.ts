import { Component,  } from '@angular/core';
import { NavController, ViewController, PopoverController } from 'ionic-angular';

@Component ({
    selector: 'save-locations',
    templateUrl: 'saved-locations.html'
})

export class SavedLocations{
     constructor(private navCtrl:NavController, private viewCtrl: ViewController){}
     close() {
         this.viewCtrl.dismiss();
        }

     done(){
        /*Todo save the text of edittext*/
        this.viewCtrl.dismiss();
     }

}