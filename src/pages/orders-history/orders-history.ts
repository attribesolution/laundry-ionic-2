import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OrdersHistoryService } from './orders-history.service';
import { globalVars } from '../../app/globalvariables';
import { LaundryMap } from '../map/map.component';
@Component({
  selector: 'page-orders-history',
  templateUrl: 'orders-history.html',
  providers: [OrdersHistoryService]
})
export class OrdersHistoryPage{
  OnInit(){
    // this.getOrdersHistory();
  }
  userID: string;
  response: any;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private ordersHistoryService: OrdersHistoryService) {
                this.userID = (JSON.stringify(localStorage.getItem("userID"))).slice(1,-1);
                // this.userID = this.navParams.get('userID');
                console.log(this.userID);
                
                this.getOrdersHistory();
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
