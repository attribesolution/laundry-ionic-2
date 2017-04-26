import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { emailValidator } from '../../shared/email-validation.directive';
import { ProfileService } from './profile.service';
import { globalVars } from '../../app/globalvariables';
import { AuthService } from "../../auth/auth.service";
@Component ({
    templateUrl: 'profile.html',
    selector: 'profile',
    providers: [
      AuthService,
      ProfileService
    ]
})

export class ProfileComponent implements OnInit{
     
    profileForm: FormGroup;
    submitted = false;
    active = true;
    token: any;
    userID: any;
    URL: string;
    userProfile: Object;
    ngOnInit(){
      console.log('ngOnInit');
        this.token = localStorage.getItem('x-access-token');
        this.userID = localStorage.getItem('userID');
        this.URL = globalVars.profileAPIURL(this.userID);
        this.profileService.getProfile(this.URL, this.token)
          .subscribe(
            res => {
              if (res.status == 200){
                console.log(res['_body']);
                let response = JSON.parse(res['_body'])['data'][0];
                this.userProfile = {
                  phone1: response.contact.phone1,
                  phone2: response.contact.phone1,
                  email1: response.contact.email1,
                  firstname: response.firstName,
                  lastname: response.lastName,
                  middlename: response.middleName,
                  city: response.currentCity,
                  country: response.currentCountry,
                }

                console.log(this.profileForm.controls['email1'].value);
              
                
                for (var item in this.userProfile) {
                  if (this.userProfile.hasOwnProperty(item)) {
                      this.profileForm.controls[item].patchValue(this.userProfile[item]);
                  }
                }
              }
              
            }
          );
        this.buildForm();
        
    }
    buildForm(): void{
        let emailReg:  RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.profileForm = this.formBuilder.group({
            firstname: ['', [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(50)]
            ],
            lastname: ['', [
                Validators.minLength(3),
                Validators.maxLength(50)]
            ],
            middlename: ['', [
                Validators.minLength(4),
                Validators.maxLength(50)]
            ],
            city: ['', [
                // Validators.minLength(4),
                // Validators.maxLength(50)
                ]
            ],
            country: ['', [
                // Validators.minLength(4),
                // Validators.maxLength(50)
                ]
            ],
            email1: ['', [
                emailValidator(emailReg)]
            ],
            phone1: ['', [
                // Validators.minLength(4),
                // Validators.maxLength(50)
                ]
            ],
            phone2: ['', [
                // Validators.minLength(4),
                // Validators.maxLength(50)
                ]
            ]
        })
    }

    validateForm(data?: any){
    
    if (!this.profileForm) {return;}
    const form = this.profileForm;
    
    for(const field in this.formsError){
      const control = form.get(field);      
      if(control){
        this.formsError[field] = '';
        this.error = false;
        const messages = this.validationMessages[field];
        for (const key in control.errors){  
          console.log(control.errors, field);
          console.log(control);          
          this.formsError[field] = messages[key];
          
            this.error = true;
          
        }
      }
    }
  }
  error: boolean = false;
  formsError = {
    firstname: '',
    lastname: '',
    middlename: '',
    city: '',
    country: '',
    phone1: '',
    email1: ''
  }

  validationMessages = {
    firstname:{
      'required': 'First name is required',
      'minlength': 'First name should contain atleast 4 characters',
      'maxlength': 'First name should be less than 50 characters'
    },
    lastname:{
      'minlength': 'Last name should contain atleast 4 characters',
      'maxlength': 'Last name should be less than 50 characters'
    },
    middlename:{
      
      'minlength': 'Last name should contain atleast 4 characters',
      'maxlength': 'Last name should be less than 36 characters'
    },
    city: {
      
    },
    country: {

    },
    phone1: {
      
    },
    phone2: {

    },
    email1: {
      'invalidEmail': 'Invalid Email address.'
    },
  }    
  ionViewDidLoad(){
    console.log('ionViewDidLoad');
    
  }
    constructor(private navCtrl: NavController,
                private formBuilder: FormBuilder,
                private profileService: ProfileService,
                private authService: AuthService){
                  console.log('constructor');
                  
        
    }

    save(){      
        this.validateForm(this.profileForm.value);
        if(this.error){
          console.log('Error');
        }else{
          // console.log('No error');
          let form = this.profileForm.value;
          console.log(form);
          
          let data = {
            "firstName": form.firstname,
            "middleName": "",
            "lastName": form.lastname,
            "currentCity": form.city,
            "currentCountry": form.country,
            "contact": {
              "phone1": form.phone1,
              "phone2": form.phone2,
              "email1": form.email1
            }
          }
          console.log(data);
          
          this.authService.putCall(this.URL, data)
            .subscribe(
              res => {
                if(res.status == 200){
                  console.log(JSON.parse(res['_body']));
                }
                
                
              }
            )  
        }
        // this.profileService.putProfile(this.URL, data, this.token)
        console.log("save clicked");
    }
}