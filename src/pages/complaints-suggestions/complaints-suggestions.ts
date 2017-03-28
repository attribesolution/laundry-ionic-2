import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { PickUpDetails } from '../pick-up-details/pick-up-details';

import { PreGenModel } from '../../models/preGen.model';

import { ComplaintsSuggestionsService } from './complatins-suggestions.service';

import { globalVars } from '../../app/globalvariables';

@Component ({
    selector: 'complaints-suggestions',
    templateUrl: 'complaints-suggestions.html',
    providers: [ComplaintsSuggestionsService]
})

export class ComplaintsSuggestionsPage{suggestions
     preGenData: PreGenModel;
     constructor(private navCtrl:NavController, public navParams: NavParams, private complaintsSuggestionsService: ComplaintsSuggestionsService){
        // this.preGenData = this.navParams.get('preGenData')
     }

startNextScreen(complaints){
      console.log(complaints);
      let userID = localStorage.getItem("userID");
      let URL = globalVars.PatchComplainURL(userID);
      
      let complaintsAndSuggestions = {complaints: complaints, dataTime: new Date().toISOString().slice(0,10).replace(/-/g,"-")};
      console.log(complaintsAndSuggestions);
      
      this.complaintsSuggestionsService.hitComplaintsSuggestionsPatchURL(URL, complaintsAndSuggestions)
        .subscribe(res => {
          console.log(res['_body']);
        });
      // this.navCtrl.push(PickUpDetails, {
      //   preGenData: this.preGenData
      // });
      console.log("Next clicked!");
  }
}