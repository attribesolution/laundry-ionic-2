import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SignUpService } from './sign-up.service';
import { globalVars } from '../../app/globalvariables';
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
  providers: [SignUpService]
})
export class SignUpPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private signUpService: SignUpService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }
  signUp(username, password, phone, email, dob){
    let URL, data: any;
    URL = globalVars.PostNewUser();
    data = {
      "username": username,
      "password": password,
      "contact": {
        "phone1": phone,
        "email": email
      },
      "dob": dob
    }
    console.log(`Sending to server ${username}, ${password}, ${phone}, ${email}`);
    this.signUpService.PostNewUser(URL,data);
  }
}
