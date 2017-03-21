import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { PickUpDetails } from '../pick-up-details/pick-up-details';

import { PreGenModel } from '../../models/preGen.model';

import { CareInstructionsService } from './care-instructions.service';

import { globalVars } from '../../app/globalvariables';

@Component ({
    selector: 'care-instructions',
    templateUrl: 'care-instructions.html',
    providers: [CareInstructionsService]
})

export class CareInstructions{
     preGenData: PreGenModel;
     constructor(private navCtrl:NavController, public navParams: NavParams, private careInstructionsService: CareInstructionsService){
        this.preGenData = this.navParams.get('preGenData')
     }

startNextScreen(shirtsIns, dryCleanIns){
      console.log(shirtsIns, dryCleanIns);
      let URL = globalVars.patchCareInstructionsURL((this.preGenData.data as any)._id);
      this.careInstructionsService.hitCareInstructionsPatch(URL, {laundryInstruction: shirtsIns, drycleanInstruction: dryCleanIns});
      this.navCtrl.push(PickUpDetails, {
        preGenData: this.preGenData
      });
      console.log("Next clicked!");
  }
}