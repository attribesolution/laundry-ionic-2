import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { GooglePlus } from '@ionic-native/google-plus';
import { NativeStorage } from 'ionic-native';
import { Storage } from '@ionic/storage';
import { JwtHelper } from 'angular2-jwt';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';

import { emailValidator } from '../../shared/email-validation.directive';

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
  signInForm: FormGroup;
  token: string;
  submitted = false;
  active = true;
  ngOnInit(): void{
    this.buildForm();
  }
  buildForm(): void{
    let emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.signInForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        emailValidator(emailReg)
        ]],
      password: ['',[
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(36)
      ]]
    });
    // this.signInForm.valueChanges
    //   .subscribe(
    //     data => {
    //       console.log(data);
          
    //       this.onValueChanged(data);
    //     }
    //   );
    //   this.onValueChanged();
  }
  // onValueChanged(data?: any){
  //   if (!this.signInForm) {return;}
  //   const form = this.signInForm;

  //   for(const field in this.formsError){
  //     this.formsError[field] = ''
  //     const control = form.get(field);
      
  //     if(control && control.dirty && control.errors){
  //       const messages = this.validationMessages[field];
  //       for (const key in control.errors){
  //         this.formsError[field] += messages[key] + ' ';
  //       }
  //     }
  //   }
  // }

  validateForm(data?: any){
    
    if (!this.signInForm) {return;}
    const form = this.signInForm;
    
    for(const field in this.formsError){
      const control = form.get(field);
      
      if(control){
        this.formsError[field] = '';
        const messages = this.validationMessages[field];
        for (const key in control.errors){  
          console.log(control.errors);
          this.formsError[field] = messages[key];
        }
      }
    }
  }

  formsError = {
    email: '',
    password: ''
  }


  validationMessages = {
    email: {
      'required': 'Email is required.',
      'invalidEmail': 'Invalid Email address.'
    },
    'password': {
      'required': 'Password is required.',
      'minlength': 'Password should contain atleast 4 characters',
      'maxlength': 'Password should be less than 36 characters'
    }
  }
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

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SignInPage');
  }
  signIn(user, passwd){
    this.validateForm(this.signInForm.value)
    this.submitted = true;
    console.log(this.signInForm.value );
    
    console.log(user,passwd);
    
    let URL = globalVars.PostSignInApi();
    this.signInService.signInUser(URL, {
      "username": this.signInForm.value.email,
      "password": this.signInForm.value.password
    }).subscribe(res => {
          if(res.status == 200){
              this.token = JSON.parse(res['_body'])['token'];
              let userID = this.jwtHelper.decodeToken(this.token);
              localStorage.setItem('x-access-token',this.token);
              this.user.saveUserId(userID);
              console.log(userID._id);
              this.user.saveUserAccessToken(this.token);
              this.navCtrl.setRoot(OrdersHistoryPage);
          }
      })
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
          this.user.saveSocialData(res.authResponse);
          localStorage.setItem('fbData', JSON.stringify(res.authResponse));
        }else{
          this.fb.login(['public_profile', 'email'])
            .then(
              (res: FacebookLoginResponse) => {
                console.log('Logged into facebook:', res)
                this.facebook = res.status;
                this.user.saveSocialData(res.authResponse);
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
        res => {
          console.log(JSON.stringify(res))
          this.user.saveSocialData(res);
          localStorage.setItem('GooglePlusData', JSON.stringify(res));
        }
      )
      .catch(
        error => console.log(error)
      )
  }
  
  forgot(){
    this.navCtrl.push(ForgotPasswordPage);
  }

}
