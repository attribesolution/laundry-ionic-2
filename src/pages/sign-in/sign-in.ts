import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { SignInService } from './sign-in.service';
import { OrdersHistoryPage } from '../orders-history/orders-history';
import { SignUpPage } from '../sign-up/sign-up';
import { globalVars } from './../../app/globalvariables';
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
  signIn(user, passwd){
    
    let body = {
      username: user,
      password: passwd
    },
    URL = globalVars.PostSignInApi();
    this.signInService.signInUser(URL, body).subscribe(res => {
                if(res.status == 200){
                    alert(true);       
                    console.log('Sign In successful with credentials', user, passwd);     
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
