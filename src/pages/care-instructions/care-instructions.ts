import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { PickUpDetails } from '../pick-up-details/pick-up-details';

import { PreGenModel } from '../../models/preGen.model';

import { CareInstructionsService } from './care-instructions.service';

import { globalVars } from '../../app/globalvariables';

//import { SpinnerDialog } from '@ionic-native/spinner-dialog';

@Component ({
    selector: 'care-instructions',
    templateUrl: 'care-instructions.html',
    providers: [CareInstructionsService]
})

export class CareInstructions{
     preGenData: PreGenModel;
     token: string;
     constructor(private navCtrl:NavController, public navParams: NavParams, private careInstructionsService: CareInstructionsService){
        this.preGenData = this.navParams.get('preGenData');
        this.token = localStorage.getItem('x-access-token');
     }

startNextScreen(shirtsIns, dryCleanIns){
     //this.spinnerDialog.show();
      console.log(shirtsIns, dryCleanIns);
      let URL = globalVars.patchCareInstructionsURL((this.preGenData.data as any)._id);
      let instructions = {laundryInstruction: shirtsIns, drycleanInstruction: dryCleanIns};
      this.careInstructionsService.hitCareInstructionsPatch(URL, {instructions: instructions}, this.token)
        .subscribe(res => {
          console.log(res['_body']);
          //this.spinnerDialog.hide();
         if(res.status == 200){
           
            this.navCtrl.push(PickUpDetails, {
         
                preGenData: this.preGenData
      
          });
          
         }
         
       
       });
      
      console.log("Next clicked!");
  }
}