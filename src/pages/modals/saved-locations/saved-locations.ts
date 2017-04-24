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
     token: string;
     addressResponse: string;
     selectedAddress: string;
     constructor(private navCtrl:NavController, private viewCtrl: ViewController, private savedLocationsService: SavedLocationService, private navParams: NavParams){
        this.token = localStorage.getItem('x-access-token');
     }
     ionViewDidLoad(){
        let userID = localStorage.getItem('userID');
        console.log(userID);
        let URL = globalVars.getUsersAddress(userID);
        console.log(URL);
        let addressResponse: any;
        this.savedLocationsService.getAddressOfSavedLocations(URL, this.token)
        .subscribe(res => {
            if (res.status == 200) {
            this.addressResponse = JSON.parse(res['_body'])['data'].contact.address;
            console.log(this.addressResponse);
            // console.log(this.addressResponse);
            }
      });
        // let address = this.navParams.get('address');
        // this.savedLocationsService.getAddressOfSavedLocations(URL, this.token);
        // console.log(address);
     }
     addressSelect(address){
        this.selectedAddress = address; 
        console.log(this.selectedAddress);
               
     }
     close() {
         this.viewCtrl.dismiss();
        }

     done(){
        /*Todo save the text of edittext*/
        this.viewCtrl.dismiss(this.selectedAddress);
     }

}