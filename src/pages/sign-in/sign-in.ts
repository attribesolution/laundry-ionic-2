import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { SignInService } from './sign-in.service';
import { OrdersHistoryPage } from '../orders-history/orders-history';
import { SignUpPage } from '../sign-up/sign-up';
import { globalVars } from './../../app/globalvariables';
import { NativeStorage } from 'ionic-native';
import { Storage } from '@ionic/storage';
import { JwtHelper } from 'angular2-jwt';
import { User } from '../../app/user';
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
  providers: [SignInService, Storage, JwtHelper, User]
})
export class SignInPage {
  token: string;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private menuController: MenuController, 
              private signInService: SignInService, 
              private storage: Storage, 
              private jwtHelper: JwtHelper,
              private user: User) {
    this.menuController.swipeEnable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInPage');
  }
  signIn(user, passwd){
    
    let URL = globalVars.PostSignInApi();
    this.signInService.signInUser(URL, {
      "username": user,
      "password": passwd
    }).subscribe(res => {
          if(res.status == 200){
              this.token = JSON.parse(res['_body'])['token'];
              let userID = this.jwtHelper.decodeToken(this.token);
              this.user.saveUserId(userID);
              // this.storage.set('userID', {"userID": userID})
              //   .then(
              //     () => {
              //       console.log('On Sign In, userID saved.');
              //     },
              //     error => {
              //       console.log('On Sign In, userID saved.');
                    
              //     }
              //   )
              console.log(userID._id);
              this.user.saveUserAccessToken(this.token);
              // this.storage.set('x-access-token', {"xAccessToken": this.token})  
              //   .then (
              //     () => {
              //       console.log('Stored X-Access-Token');
                    this.navCtrl.setRoot(OrdersHistoryPage);
              //     },
              //     error => console.error('Error storing item', error)
              //   );
              // console.log('Sign In successful with', this.token);     
          }
      })
      // this.navCtrl.setRoot(OrdersHistoryPage);
      // alert('Sign in Successful ')
    // }else{
      
    // }
  }
  signupPage(){
    this.navCtrl.setRoot(SignUpPage);
  }

}
