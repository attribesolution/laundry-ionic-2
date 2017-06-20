import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'
import {JwtHelper} from 'angular2-jwt'
// import { SignInService } from '../pages/sign-in/sign-in.service';
/**
 * Author: Muhammad Shahab
 * Date: 7 Apr 2017
 * Description: Native Storage class to cache the key/value of user information 
 */
@Injectable()
export class User {

  intervalHandler : any
  constructor(private storage: Storage , private jwt: JwtHelper){}  

  getUserId()
  {
    //  this.storage.ready().then(() => {

       //  to get a key/value pair of user id
       this.storage.get('user-id').then((val) => {
         console.log("user id returned = ",val["user-id"])
        return val["user-id"];
       })
    //  });
  }
  saveUserId(userId:String)
  {
    // this.storage.ready().then(() => {

       // set a key/value pair of user id
       this.storage.set('user-id', userId);
       console.log("user id saved = ", userId );
    //  });
  }

  getUserAccessToken()
  {
    // this.storage.ready().then(() => {

       // to get a key/value pair of user-access-token
       this.storage.get('x-access-token').then((val) => {
        return val["x-access-token"];
       })
    //  });
  }
  setUserEmail(email:string){

    // this.storage.ready().then(() => {

       // set a key/value pair of user-access-token
       this.storage.set('email', email);
       localStorage.setItem('email',email);
      
    // });
     

  }

  getUserEmai(){

    // this.storage.ready().then(() => {

       //  to get a key/value pair of user id
       this.storage.get('email').then((val) => {
         console.log("email returned = ",val["email"])
        return val["email"];
       })
    //  });

  }
  setUserPassword(password:string){

    // this.storage.ready().then(() => {

       // set a key/value pair of user-access-token
       this.storage.set('password', password);
       localStorage.setItem('password',password);
      
    // });


  }
  getUserPassword(){

    // this.storage.ready().then(() => {

       //  to get a key/value pair of user id
       this.storage.get('password').then((val) => {
         console.log("password returned = ",val["password"])
        return val["password"];
       })
    //  });

  }
  saveUserAccessToken(accessToken:string)
  {
        // this.storage.ready().then(() => {

       // set a key/value pair of user-access-token
       this.storage.set('x-access-token', accessToken);
       

    //  });
  }
  /**
   * set an interval for refresh x-access-token
   */
  // scheduleRefresh(token:string){

  //     //let time  = this.jwt.getTokenExpirationDate(token).getSeconds()-10;// refresh token 1 hour before expiring
  //     let now: number = new Date().valueOf();
  //     let jwtExp = this.jwt.decodeToken(token).exp;
  //     let exp = new Date(0);
  //     exp.setUTCSeconds(jwtExp);
  //     let delay = exp.valueOf() - now;
  //      console.log("expiration time in seconds = ",delay/1000);
  //       if(delay > 0)
  //            this.intervalHandler = setInterval(this.refreshToken(),delay/1000);
  //       else
  //         this.refreshToken();

  // }
  // /**
  //  * 
  //  * 
  //  */
  // refreshToken(){
    
  //   console.log("refresh token called");
  //   this.SignInService.signInUser(URL, {
  //     "username": this.signInForm.value.email,
  //     "password": this.signInForm.value.password
  //   }).subscribe(res => {
  //         if(res.status == 200){
  //             this.token = JSON.parse(res['_body'])['token'];
  //             let userID = this.jwt.decodeToken(this.token);
  //             localStorage.setItem('x-access-token',this.token);   
  //             localStorage.setItem('userID',this.jwt.decodeToken(this.token)['_id']);
  //             this.user.saveUserId(userID);
  //             this.user.saveUserAccessToken(this.token);
  //             console.log(userID._id);
  //             this.user.scheduleRefresh(this.token);
  //             this.navCtrl.setRoot(OrdersHistoryPage);
  //         }
  //     });
  // }
  // /**
  //  * clear all set intervals 
  //  * call when signing out the user
  //  */
  // clearsetInterval(){

  //   clearInterval(this.intervalHandler);
  // }
  saveSocialData(SocialData){
    // this.storage.ready()
      // .then(
        // () =>{
          this.storage.set('Social', SocialData);
        // }
      // )
  }
}
