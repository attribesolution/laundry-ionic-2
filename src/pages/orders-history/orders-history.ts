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
  refreshController : any;
  hideActivityLoader:boolean;
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
 
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.getOrdersHistory();
    this.refreshController = refresher;
  }
  getOrdersHistory(){
   
    
    console.log('ionViewDidLoad OrdersHistoryPage');
    let xAccessToken: any;
        let options, headers: any;
        // let token = this.user.getUserAccessToken();
        // console.log(token);
        let token = localStorage.getItem('x-access-token');
        this.userID = localStorage.getItem('userID');
        let URL = globalVars.getOrdersHistoryURL(this.userID); 
        this.ordersHistoryService.getOrdersHistory(URL, token)
          .subscribe(res => {
            if(res.status == 200) {
              console.log(JSON.parse(res['_body']));
              this.response = res;
            }
          },error=>{
            this.hideActivityLoaders();
            console.log("Order history error = ", error);
          },()=>{

            this.hideActivityLoaders();
          })
    
  }
  hideActivityLoaders(){

      this.hideActivityLoader = true;
      // check if refreshController is'nt undefined
      if(this.refreshController)
      this.refreshController.complete();
}
  placeOrder(){
    this.navCtrl.push(LaundryMap);
  }
}
