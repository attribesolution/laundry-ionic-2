import { Component } from '@angular/core';

import { NavController, NavParams, ToastController } from 'ionic-angular';
import { PickUpDetails } from '../pick-up-details/pick-up-details';

import { PreGenModel } from '../../models/preGen.model';

import { ComplaintsSuggestionsService } from './complatins-suggestions.service';

import { globalVars } from '../../app/globalvariables';

import { AuthService } from "../../auth/auth.service";

import { AlertDialogFactory } from "../../app/alert.dialog";

@Component ({
    selector: 'complaints-suggestions',
    templateUrl: 'complaints-suggestions.html',
    providers: [AuthService,
                ComplaintsSuggestionsService,
                AlertDialogFactory]
})

export class ComplaintsSuggestionsPage{suggestions
     preGenData: PreGenModel;
     complaints1: any = '';
     charcount = 0;
     suggest;
     constructor(private navCtrl:NavController, 
                 public navParams: NavParams, 
                 private complaintsSuggestionsService: ComplaintsSuggestionsService, 
                 private toastCtrl: ToastController,
                 private authService: AuthService,
                 private alertCntrl: AlertDialogFactory){
        // this.preGenData = this.navParams.get('preGenData')
        this.getHistory();
     }
    ionViewDidLoad(){
      
    }    
    onTextEnter(value){
      this.charcount = value.length
      console.log(value.length);
      
    } 
    getHistory = () => {
      //this.spinnerDialog.show();
      let userID = localStorage.getItem("userID");
      let URL = globalVars.getComplainsURL(userID);
      this.authService.getCall(URL)
        .subscribe(res =>{
          if (res.status == 200){
            this.complaints1= [];
            console.log(res['_body']);
            this.complaints1 = res['_body'] == undefined ? '' : JSON.parse(res['_body'])['data'][0]['complains'];
            console.log(this.complaints1);
          }
          //this.spinnerDialog.hide();
        });
    }

    presentToast = () =>{
         let toast = this.toastCtrl.create({
             message: 'Your complaints/suggestion have been noted.',
             duration: 2500,
             position: 'bottom',
             cssClass: 'toastBg'
         });
         toast.onDidDismiss(() => {
             console.log('Dismissed Toast.');
         });   
        toast.present();
     }

  startNextScreen(complaints){
      console.log(complaints);
      if(!!complaints){
        let userID = localStorage.getItem("userID");
        let URL = globalVars.PatchComplainURL(userID);
        this.suggestions = '';
        let complaintsAndSuggestions = {complain: complaints, dataTime: new Date().toISOString().slice(0,10).replace(/-/g,"-")};
        console.log(complaintsAndSuggestions);
        //this.spinnerDialog.show();
        this.authService.patchCall(URL, complaintsAndSuggestions)
          .subscribe(res => {
            if(res.status == 200){
              //this.spinnerDialog.hide();
              console.log(res['_body']);
              this.presentToast()
              this.suggest = '';
              this.getHistory();

              // let URL2 = globalVars.getComplainsURL(userID);
              // this.complaintsSuggestionsService.hitComplaintsSuggestionsGetURL(URL2)
              //   .subscribe(response => {
              //     this.spinnerDialog.hide();
              //     if (response.status == 200){
              //       console.log(response['body']);
                    
                    
              //     }
              //   })
            }
          });
      }else{
        this.alertCntrl.openAlertDialog("What's missing?", "Please enter a suggestion or complaint");
      }
      
      
      //   preGenData: this.preGenData
      // });
      console.log("Next clicked!");
  }
}