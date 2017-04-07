import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NativeStorage } from '@ionic-native/native-storage';
import { JwtHelper } from 'angular2-jwt';
import { OrdersHistoryService } from './orders-history.service';
import { globalVars } from '../../app/globalvariables';
import { LaundryMap } from '../map/map.component';
@Component({
  selector: 'page-orders-history',
  templateUrl: 'orders-history.html',
  providers: [OrdersHistoryService, NativeStorage, Storage, JwtHelper]
})
export class OrdersHistoryPage{
  OnInit(){
    // this.getOrdersHistory();
  }
  userID: string;
  response: any;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private ordersHistoryService: OrdersHistoryService,
              private storage: Storage,
              private nativeStorage: NativeStorage,
              private jwtHelper: JwtHelper) {
                storage.get("x-access-token")
                  .then(token => {
                    this.userID = this.jwtHelper.decodeToken((token)['xAccessToken'])['_id'];
                    console.log(this.userID);
                    this.getOrdersHistory();
                  })
                // this.userID = this.navParams.get('userID');
                console.log(this.userID);
                
                
  }
  ionViewDidLoad(){
    // this.getOrdersHistory();
  }
  getOrdersHistory(){
    let URL = globalVars.getOrdersHistoryURL(this.userID);
    console.log('ionViewDidLoad OrdersHistoryPage');
    this.ordersHistoryService.getOrdersHistory(URL)
      .subscribe(res => {
        this.response = JSON.parse(res['_body']);
        console.log(this.response);
      });
  }
  placeOrder(){
    this.navCtrl.push(LaundryMap);
  }
}
