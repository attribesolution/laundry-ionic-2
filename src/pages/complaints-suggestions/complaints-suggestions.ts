import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { PickUpDetails } from '../pick-up-details/pick-up-details';

import { PreGenModel } from '../../models/preGen.model';

import { ComplaintsSuggestionsService } from './complatins-suggestions';

import { globalVars } from '../../app/globalvariables';

@Component ({
    selector: 'complaints-suggestions',
    templateUrl: 'complaints-suggestions.html',
    providers: [ComplaintsSuggestionsService]
})

export class ComplaintsSuggestionsPage{
     preGenData: PreGenModel;
     constructor(private navCtrl:NavController, public navParams: NavParams, private complaintsSuggestionsService: ComplaintsSuggestionsService){
        // this.preGenData = this.navParams.get('preGenData')
     }

startNextScreen(complaints, suggestions){
      console.log(complaints, suggestions);
      // let URL = globalVars.patchCareInstructionsURL((this.preGenData.data as any)._id);
      
      let complaintsAndSuggestions = {complaints: complaints, suggestions: suggestions};
      console.log(complaintsAndSuggestions);
      
      // this.complaintsSuggestionsService.hitCareInstructionsPatch(URL, {instructions: instructions})
      //   .subscribe(res => {
      //     console.log(res['_body']);
      //   });
      // this.navCtrl.push(PickUpDetails, {
      //   preGenData: this.preGenData
      // });
      console.log("Next clicked!");
  }
}