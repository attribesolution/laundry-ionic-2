import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { PickUpDetails } from '../pick-up-details/pick-up-details';

import { PreGenModel } from '../../models/preGen.model'

@Component ({
    selector: 'care-instructions',
    templateUrl: 'care-instructions.html'
})

export class CareInstructions{
     preGenData: PreGenModel;
     constructor(private navCtrl:NavController, public navParams: NavParams){
        this.preGenData = this.navParams.get('preGenData')
     }

startNextScreen(){
      this.navCtrl.push(PickUpDetails, {
        preGenData: this.preGenData
      });
      console.log("Next clicked!");
  }
}