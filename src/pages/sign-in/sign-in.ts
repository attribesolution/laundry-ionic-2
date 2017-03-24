import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { SignInService } from './sign-in.service';
import { OrdersHistoryPage } from '../orders-history/orders-history';
import { SignUpPage } from '../sign-up/sign-up';
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
  providers: [SignInService]
})
export class SignInPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private menuController: MenuController, private signInService: SignInService) {
    this.menuController.swipeEnable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInPage');
  }
  signIn(username, password){
    console.log('Sign In successful with credentials', username, password);
    if(this.signInService.getUser(username, password).signIn == 'SucessFull'){
      this.navCtrl.setRoot(OrdersHistoryPage);
    }else{
      
    }
  }
  signupPage(){
    this.navCtrl.setRoot(SignUpPage);
  }

}
