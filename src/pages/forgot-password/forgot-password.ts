import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ForgotPasswordService } from './forgot-passwoord.service';
import { globalVars } from '../../app/globalvariables';
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
  providers: [ForgotPasswordService]
})
export class ForgotPasswordPage {
  emailSent: boolean = false;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private forgotPasswordService: ForgotPasswordService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }
  forgot(email){
    console.log(email);
    let URL = globalVars.getForgotPasswordAPIURL(email);
    this.forgotPasswordService.hitForgotPasswordAPI(URL)
      .subscribe(
        res =>{
          if(res.status == 200){
            let response = JSON.parse(res['_body']);
            if(response.data.emailSent){
              this.emailSent = true;
            }
            console.log(JSON.parse(res['_body'])); 
          }
        }
      )
  }
}
