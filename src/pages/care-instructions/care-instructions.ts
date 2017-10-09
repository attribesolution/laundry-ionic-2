import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PickUpDetails } from '../pick-up-details/pick-up-details';
import { PreGenModel } from '../../models/preGen.model';
import { CareInstructionsService } from './care-instructions.service';
import { globalVars } from '../../app/globalvariables';
import { AuthService } from "../../auth/auth.service";
//import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { AlertDialogFactory } from "../../app/alert.dialog";
@Component ({
    selector: 'care-instructions',
    templateUrl: 'care-instructions.html',
    providers: [AuthService, 
                CareInstructionsService,
                AlertDialogFactory]
})

export class CareInstructions{
     preGenData: PreGenModel;
     token: string;
     additionalInfoText: string;
     constructor(private navCtrl:NavController, 
                 public navParams: NavParams, 
                 private careInstructionsService: CareInstructionsService,
                 private authService: AuthService,
                 private alertCntrl: AlertDialogFactory){
        this.preGenData = this.navParams.get('preGenData');
        this.token = localStorage.getItem('x-access-token');
        this.additionalInfoText = localStorage.getItem('additionalInfoText');
     }

startNextScreen(shirtsIns, dryCleanIns){
     //this.spinnerDialog.show();
    //  if(shirtsIns && dryCleanIns){
      shirtsIns += this.additionalInfoText || '';
      console.log(shirtsIns, dryCleanIns);
      
      let URL = globalVars.patchCareInstructionsURL((this.preGenData.data as any)._id);
      let instructions = {laundryInstruction: shirtsIns, drycleanInstruction: dryCleanIns};
      this.authService.patchCall(URL, {instructions: instructions})
        .subscribe(res => {
          console.log(res['_body']);
          //this.spinnerDialog.hide();
         if(res.status == 200){
           
            this.navCtrl.push(PickUpDetails, {
         
                preGenData: this.preGenData
      
            });

          }
        },error=>{

        //this.hideActivityLoaders();
      },()=>{
      
      // this.hideActivityLoaders();
      });

      console.log("Next clicked!");
    //  }else{
    //   this.alertCntrl.openAlertDialog("What's missing", 'Please fill both fields.');
    //  }
      
  }
}