import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NativeStorage } from '@ionic-native/native-storage';
import { JwtHelper } from 'angular2-jwt';
import { Http, RequestOptions, Headers } from '@angular/http';
import { OrdersHistoryService } from './orders-history.service';
import { globalVars } from '../../app/globalvariables';
import { LaundryMap } from '../map/map.component';
import { User } from '../../app/user';
@Component({
  selector: 'page-orders-history',
  templateUrl: 'orders-history.html',
  providers: [User, OrdersHistoryService, NativeStorage, Storage, JwtHelper]
})
export class OrdersHistoryPage{
  OnInit(){
    // this.getOrdersHistory();
  }
  userID: string;
  response: any;
  // user = User;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private ordersHistoryService: OrdersHistoryService,
              private storage: Storage,
              private nativeStorage: NativeStorage,
              private jwtHelper: JwtHelper,
              private user: User) {
              // let xAccessToken = this.user.getUserAccessToken();
              
              this.getOrdersHistory();
                this.userID = this.navParams.get('userID');
                // console.log(this.userID);
                
                
  }
  ionViewDidLoad(){
    // this.getOrdersHistory();
  }
  getOrdersHistory(){
   
    
    console.log('ionViewDidLoad OrdersHistoryPage');
    let xAccessToken: any;
        let options, headers: any;
        let token = this.user.getUserAccessToken();
        console.log(token);
        
        this.storage.get('user-access-token')
            .then(
               data => {
                   let token = data;
                   this.userID = this.jwtHelper.decodeToken(token)._id;
                   let URL = globalVars.getOrdersHistoryURL(this.userID); 
                  //  console.log('On OrdersHistoryService', xAccessToken);
                  //  headers = new Headers({'Content-Type': 'application/json', 'access_token':  xAccessToken});
                  //  options = new RequestOptions({ headers: headers });
                   this.ordersHistoryService.getOrdersHistory(URL, token)
                    .then(res => {
                      // this.response = JSON.parse(res['_body']);
                      console.log(res);
                    },err => {});
                } 
            )
    
  }
  placeOrder(){
    this.navCtrl.push(LaundryMap);
  }
}
