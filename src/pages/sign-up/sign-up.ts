import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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

 public signUpForm = new FormGroup({
      username: new FormControl("username", Validators.required),
      password: new FormControl("password", Validators.required),
      phone: new FormControl("phone", Validators.required),
      email: new FormControl("email", Validators.required),
      dob: new FormControl("dob", Validators.required),
    });
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private signUpService: SignUpService,
    public formBuilder: FormBuilder) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }
  signUp(username, password, phone, email, dob) {

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
    this.signUpService.PostNewUser(URL, data)
      .subscribe(res => {
        if (res.status = 200) {
          console.log(res['_body']);
          let body = JSON.parse(res['_body']);
          response = {
            href: body["href"],
            data: body["data"]
          }
          console.log(response.data._id);
          localStorage.setItem("userID", response.data._id);
          this.navCtrl.setRoot(OrdersHistoryPage, { userID: response.data._id });
        }
      });
    }
  signinPage() {
    this.navCtrl.setRoot(SignInPage);
  }
}
