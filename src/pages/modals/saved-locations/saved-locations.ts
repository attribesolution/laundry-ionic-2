import { Component } from '@angular/core';
import { NavController, ViewController, PopoverController, NavParams } from 'ionic-angular';
import { SavedLocationService } from './saved-location.service';
import { globalVars } from './../../../app/globalvariables';
@Component ({
    selector: 'save-locations',
    templateUrl: 'saved-locations.html',
    providers: [SavedLocationService]
})

export class SavedLocations{
     constructor(private navCtrl:NavController, private viewCtrl: ViewController, private savedLocationsService: SavedLocationService, private navParams: NavParams){
        
     }
     ionViewDidLoad(){
        let address = this.navParams.get('address');
        console.log(address);
     }
     close() {
         this.viewCtrl.dismiss();
        }

     done(){
        /*Todo save the text of edittext*/
        this.viewCtrl.dismiss();
     }

}