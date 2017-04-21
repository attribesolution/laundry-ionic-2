import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NativeStorage } from '@ionic-native/native-storage';
import { JwtHelper } from 'angular2-jwt';
import { Http, RequestOptions, Headers } from '@angular/http';

import { OrdersHistoryService } from './orders-history.service';

import { globalVars } from '../../app/globalvariables';
import { PreGenModel } from '../../models/preGen.model';

import { LaundryMap } from '../map/map.component';
import { OrderSummaryPage } from '../order-summary/order-summary';
import { User } from '../../app/user';
@Component({
  selector: 'page-orders-history',
  templateUrl: 'orders-history.html',
  providers: [User, OrdersHistoryService, NativeStorage, Storage, JwtHelper]
})
export class OrdersHistoryPage{
  
  OnInit(){
    
  }
  
  userID: string;
  response: any;
  preGenData: PreGenModel;
  refreshController : any;
  hideActivityLoader:boolean;
  preGenApiURL: string;
  // user = User;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private ordersHistoryService: OrdersHistoryService,
              private storage: Storage,
              private nativeStorage: NativeStorage,
              private jwtHelper: JwtHelper,
              private user: User) {
              // let xAccessToken = this.user.getUserAccessToken();
              
              
              // storage.get('user-id').then(
              //   data =>{
              //     console.log(data);
              //     console.log(data._id);
                  
              //     this.userID = data._id;
              //     this.preGenApiURL = globalVars.PreGenApiURL(this.userID);
              //     this.getOrdersHistory();
              //   });
              
              this.userID = localStorage.getItem('userID');
              // // console.log(this.userID);
              
                
              }
 
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.getOrdersHistory();
    this.refreshController = refresher;
  }
  getOrdersHistory(){
   
    
    console.log('ionViewDidLoad OrdersHistoryPage');
        let token = localStorage.getItem('x-access-token');
        // this.userID = localStorage.getItem('userID');
        let URL = globalVars.getOrdersHistoryURL(this.userID); 
        console.log(URL);
        console.log(token);
        
        this.ordersHistoryService.getOrdersHistory(URL, token)
          .subscribe(res => {
            if(res.status == 200) {
              console.log(res);
              console.log(JSON.parse(res['_body']));
              this.response = JSON.parse(res['_body']);
              
            }
          },error=>{
            this.hideActivityLoaders();
            console.log("Order history error = ", error);
          },()=>{

            this.hideActivityLoaders();
          })
    // this.hideActivityLoaders();
  }
  hideActivityLoaders(){

      this.hideActivityLoader = true;
      // check if refreshController is'nt undefined
      if(this.refreshController)
      this.refreshController.complete();
}
  placeOrder(){
    this.storage.get("x-access-token")
      .then(
      token => {
        // console.log(token);
        
        this.createPreGen(this.preGenApiURL, token);
      }
      )
    
  }

  createPreGen(URL, token) {
    console.log('Create Pre Gen Called');
    console.log(URL);
    
    this.ordersHistoryService.hitPreGen(URL, token)
      .subscribe(res => {
        if (res.status == 200) {
          let response = JSON.parse(res['_body'])
          // console.log(res['_body']);

          this.preGenData = {
            href: response["href"],
            data: response["data"]
          }
          console.log('Response From PreGen', (this.preGenData.data as any));
          this.navCtrl.push(LaundryMap, {
            preGenData: this.preGenData
          });
        }
      }, err => {
        console.log(JSON.stringify(err));        
      });
  }
  showOrderSummary(orderID){
    this.navCtrl.push(OrderSummaryPage, {
      orderID: orderID
    })
  }
}
