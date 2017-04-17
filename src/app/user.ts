import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'

/**
 * Author: Muhammad Shahab
 * Date: 7 Apr 2017
 * Description: Native Storage class to cache the key/value of user information 
 */
@Injectable()
export class User {
  constructor(private storage: Storage){}  

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

  saveUserAccessToken(accessToken:String)
  {
        this.storage.ready().then(() => {

       // set a key/value pair of user-access-token
       this.storage.set('x-access-token', accessToken);
     });
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
