import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { DropOffDetails} from '../drop-off-details/drop-off-details';

@Component ({
    selector: 'care-instructions',
    templateUrl: 'care-instructions.html'
})

export class CareInstructions{
     constructor(private navCtrl:NavController){}

startNextScreen()
  {
      this.navCtrl.push(DropOffDetails);
      console.log("Next clicked!");
  }
}