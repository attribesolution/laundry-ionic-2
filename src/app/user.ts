import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'
import {JwtHelper} from 'angular2-jwt'

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
     this.storage.ready().then(() => {

       //  to get a key/value pair of user id
       this.storage.get('user-id').then((val) => {
        return val["user-id"];
       })
     });
  }
  saveUserId(userId:String)
  {
    this.storage.ready().then(() => {

       // set a key/value pair of user id
       this.storage.set('user-id', userId);
     });
  }

  getUserAccessToken()
  {
    this.storage.ready().then(() => {

       // to get a key/value pair of user-access-token
       this.storage.get('x-access-token').then((val) => {
        return val["x-access-token"];
       })
     });
  }

  saveUserAccessToken(accessToken:string)
  {
        this.storage.ready().then(() => {

       // set a key/value pair of user-access-token
       this.storage.set('x-access-token', accessToken);
       

     });
  }
  /**
   * set an interval for refresh x-access-token
   */
  scheduleRefresh(token:string){

      //let time  = this.jwt.getTokenExpirationDate(token).getSeconds()-10;// refresh token 1 hour before expiring
      let now: number = new Date().valueOf();
      let jwtExp = this.jwt.decodeToken(token).exp;
      let exp = new Date(0);
      exp.setUTCSeconds(jwtExp);
      let delay = exp.valueOf() - now;
       console.log("expiration time in seconds = ",delay/1000);
        if(delay > 0)
             this.intervalHandler = setInterval(this.refreshToken(),delay/1000);
        else
          this.refreshToken();

  }
  refreshToken(){

    console.log("refresh token called");
    
  }
  /**
   * clear all set intervals 
   * call when signing out the user
   */
  clearsetInterval(){

    clearInterval(this.intervalHandler);
  }
  saveSocialData(SocialData){
    this.storage.ready()
      .then(
        () =>{
          this.storage.set('Social', SocialData);
        }
      )
  }
}
