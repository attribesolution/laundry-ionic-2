import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { PickUpDetails } from '../pick-up-details/pick-up-details';

@Component ({
    selector: 'care-instructions',
    templateUrl: 'care-instructions.html'
})

export class CareInstructions{
     constructor(private navCtrl:NavController){}

startNextScreen()
  {
      this.navCtrl.push(PickUpDetails);
      console.log("Next clicked!");
  }
}