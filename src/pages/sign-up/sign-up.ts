import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, MenuController} from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JwtHelper } from 'angular2-jwt';

import { emailValidator } from '../../shared/email-validation.directive';

import { User } from '../../app/user';
import { SignUpService } from './sign-up.service';
import { SignInService } from './../sign-in/sign-in.service';
import { globalVars } from '../../app/globalvariables';
import { OrdersHistoryPage } from '../orders-history/orders-history';
import { LaundryMap } from '../map/map.component';
import { SignInPage } from '../sign-in/sign-in';
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
  providers: [SignUpService, SignInService, JwtHelper, User]
})
export class SignUpPage implements OnInit{

  signUpForm: FormGroup;
  submitted = false;
  active = true;
  token: any;
  ngOnInit(){
    this.buildForm();
  }
  buildForm(): void{
    let emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.signUpForm = this.formBuilder.group({
      username: ['',[
        Validators.required
      ]],
      firstname: [''],
      lastname: [''],
      password: ['',[
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(36)
      ]],
      phone: ['',[
        Validators.required
      ]],
      email: ['',[
        Validators.required,
        emailValidator(emailReg)
      ]],
      dob: ['',[
        Validators.required
      ]]
    });
  }
  validateForm(data?: any){
    
    if (!this.signUpForm) {return;}
    const form = this.signUpForm;
    
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
    username: '',
    password: '',
    phone: '',
    email: '',
    dob: ''
  }

  validationMessages = {
    username:{
      'required': 'Username is required.',
    },
    password: {
      'required': 'Password is required.',
      'minlength': 'Password should contain atleast 4 characters',
      'maxlength': 'Password should be less than 36 characters'
    },
    phone:{
      'required': 'Phone number is required.',
    },
    email: {
      'required': 'Email is required.',
      'invalidEmail': 'Invalid Email address.'
    },
    dob:{
      'required': 'Date of Birth is required.',
    }
  }

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private jwtHelper: JwtHelper,
              private user: User,
              private signUpService: SignUpService,
              private signInService: SignInService,
              private formBuilder: FormBuilder,
              private menuController: MenuController) {
                this.menuController.swipeEnable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }
  signUp(username, password, phone, email, dob) {
    this.validateForm(this.signUpForm.value);
    this.submitted = true;
    console.log(this.signUpForm.value);
    
    let URL, data: any;
    URL = globalVars.PostNewUser();
    data = {
      "username": this.signUpForm.value.username,
      "firstname": "this.signUpForm.value.firsname",
      "lastname": "this.signUpForm.value.lastname",
      "password": this.signUpForm.value.password,
      "contact": {
        "phone1": this.signUpForm.value.phone,
        "email1": this.signUpForm.value.email
      },
      "dob": this.signUpForm.value.dob
    }
    console.log(`Sending to server ${data.username}, ${data.password}, ${data.contact.phone1}, ${data.contact.email1}`);
    let response: any;
    this.signUpService.PostNewUser(URL, data)
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
                  let signInData = {
                    username: data.contact.email1,
                    password: data.password
                  };
                  this.requestSignIn(signInData);
              });
  }
  requestSignIn(data){
    console.log(data.password);
    
    console.log('Inside Sign in call');
    
    let URL = globalVars.PostSignInApi();
    this.signInService.signInUser(URL, data)
      .subscribe(res => {
        this.token = JSON.parse(res['_body'])['token'];
        let userID = this.jwtHelper.decodeToken(this.token);
        localStorage.setItem('x-access-token',this.token);
        this.user.saveUserId(userID);
        console.log(userID._id);
        this.user.saveUserAccessToken(this.token);
        this.navCtrl.setRoot(OrdersHistoryPage);
        
      }, err => {
        console.log(err);
        
      })
  }
  signinPage(){

    this.navCtrl.setRoot(SignInPage);
  }
}
