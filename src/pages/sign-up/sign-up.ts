import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SignUpService } from './sign-up.service';
import { globalVars } from '../../app/globalvariables';
import { OrdersHistoryPage } from '../orders-history/orders-history';
import { LaundryMap } from '../map/map.component';
import { SignInPage } from '../sign-in/sign-in';
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
        "email1": email
      },
      "dob": dob
    }
    console.log(`Sending to server ${username}, ${password}, ${phone}, ${email}`);
    let response: any;
    this.signUpService.PostNewUser(URL,data)
      .subscribe(res => {
                  if(res.status = 200){
                      console.log(JSON.parse(res['_body']));
                      let body  = JSON.parse(res['_body']);
                      response = {
                        href: body["href"],
                        data: body["data"]
                      }
                      console.log("response data = ",response.data);
                      localStorage.setItem("userID", response.data._id);
                      //this.user.saveUserAccessToken(response.data.);
                      this.navCtrl.setRoot(OrdersHistoryPage, {userID: response.data._id});
                  }
              });
  }
  signinPage(){
    this.navCtrl.setRoot(SignInPage);
  }
}
