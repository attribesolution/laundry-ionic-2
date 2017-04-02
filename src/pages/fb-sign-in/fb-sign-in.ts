import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {  NativeStorage,FacebookLoginResponse,Facebook } from 'ionic-native';
//import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { OrdersHistoryPage } from './../orders-history/orders-history';
/*
  Generated class for the FBSignIn page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-fb-sign-in',
  templateUrl: 'fb-sign-in.html'
})
export class FBSignInPage {
  FB_APP_ID: number = 424333447903216;

  constructor(public navCtrl: NavController , private fb: Facebook) {
    //fb.browserInit(this.FB_APP_ID, "v2.8")
    //fb.browserInit(this.FB_APP_ID, "v2.8");

    Facebook.browserInit(424333447903216, "v2.8")
    
  }

 ngAfterViewInit(){
        
        Facebook.login(['public_profile', 'user_friends', 'email'])
  .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
  .catch(e => console.log('Error logging into Facebook', e));

  //       this.fb.login(['public_profile', 'user_friends', 'email'])
  // .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
  // .catch(e => console.log('Error logging into Facebook', e));
    }
    ionViewDidLoad(){
           Facebook.login(['public_profile', 'user_friends', 'email'])
  .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
  .catch(e => console.log('Error logging into Facebook', e));
    }

  /*doFbLogin(){
    let permissions = new Array();
    let nav = this.navCtrl;
    //the permissions your facebook app needs from the user
    permissions = ["public_profile"];


    Facebook.login(permissions)
    .then(function(response){
      let userId = response.authResponse.userID;
      let params = new Array();

      //Getting name and gender properties
      Facebook.api("/me?fields=name,gender", params)
      .then(function(user) {
        user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
        //now we have the users info, let's save it in the NativeStorage
        NativeStorage.setItem('user',
        {
          name: user.name,
          gender: user.gender,
          picture: user.picture
        })
        .then(function(){
          nav.push(OrdersHistoryPage);
        }, function (error) {
          console.log(error);
        })
      })
    }, function(error){
      console.log(error);
    });
  }*/
}