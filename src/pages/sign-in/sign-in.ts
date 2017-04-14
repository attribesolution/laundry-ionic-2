import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { NativeStorage } from 'ionic-native';
import { Storage } from '@ionic/storage';
import { JwtHelper } from 'angular2-jwt';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { User } from '../../app/user';
import { SignInService } from './sign-in.service';
import { OrdersHistoryPage } from '../orders-history/orders-history';
import { SignUpPage } from '../sign-up/sign-up';
import { ForgotPasswordPage } from './../forgot-password/forgot-password';
import { globalVars } from './../../app/globalvariables';

@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
  providers: [SignInService, Storage, JwtHelper, User, Facebook, GooglePlus]
})
export class SignInPage implements OnInit {
  form: FormGroup;
  token: string;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private menuController: MenuController, 
              private signInService: SignInService, 
              private storage: Storage, 
              private jwtHelper: JwtHelper,
              private user: User,
              private fb: Facebook,
              private googlePlus: GooglePlus,
              private formBuilder: FormBuilder) {
    this.menuController.swipeEnable(false);
  }

  ngOnInit(){
    this.form = this.formBuilder.group({
      email: ['', [
        Validators.required,
        
        ]],
      password: ['']
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInPage');
  }
  signIn(user, passwd){
    console.log(this.form.value );
    
    console.log(user,passwd);
    
    let URL = globalVars.PostSignInApi();
    this.signInService.signInUser(URL, {
      "username": user,
      "password": passwd
    }).subscribe(res => {
          if(res.status == 200){
              this.token = JSON.parse(res['_body'])['token'];
              let userID = this.jwtHelper.decodeToken(this.token);
              localStorage.setItem('x-access-token',this.token);
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
  facebook = "facebook";
  fbSignIn(){
    console.log('FB SignIn clicked.');
    this.fb.getLoginStatus().then(
      res =>{
        if(res.status === 'connected'){
          this.facebook = res.status;
          let uid = res.authResponse.userID;
          let accessToken = res.authResponse.accessToken;
          this.user.saveFBData(res.authResponse);
          localStorage.setItem('fbData', JSON.stringify(res.authResponse));
        }else{
          this.fb.login(['public_profile', 'email'])
            .then(
              (res: FacebookLoginResponse) => {
                console.log('Logged into facebook:', res)
                this.facebook = res.status;
                this.user.saveFBData(res.authResponse);
                localStorage.setItem('fbData', JSON.stringify(res.authResponse));
              }
            )
            .catch( 
              e => {
                console.log('Error logging into facebook', e)
                this.facebook = e
            })
        }
        this.navCtrl.setRoot(OrdersHistoryPage);
      }
    )
    
      
  }
  googleSignIn(){
    this.googlePlus.login({})
      .then(
        res => console.log(res)
      )
      .catch(
        error => console.log(error)
      )
  }
  
  forgot(){
    this.navCtrl.push(ForgotPasswordPage);
  }

}
