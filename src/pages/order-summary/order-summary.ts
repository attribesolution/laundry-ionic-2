import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { OrderPlaced } from '../order-placed/order-placed';

import { OrderSummaryService } from './order-summary.service';
import { globalVars } from '../../app/globalvariables';
@Component({
  selector: 'page-order-summary',
  templateUrl: 'order-summary.html',
  providers: [
    OrderSummaryService,
    Storage
    ]
})
export class OrderSummaryPage {
  laundryItems: any;
  locationForHTML: any;
  orderID: string;
  showFooter: boolean = false;
  details = {
    error: ''
  };
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private orderSummaryService: OrderSummaryService,
              private storage: Storage) {
                this.orderID = this.navParams.get('orderID');
                this.showFooter = this.navParams.get('navigateFromOrderHistory') || false;
              }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderSummaryPage');
    
    console.log(this.orderID);
    
    if(!!this.orderID){
      let URL = globalVars.getOrderByIdURL(this.orderID);
      this.storage.get('x-access-token')
        .then(token => {
          this.orderSummaryService.getOrderByID(URL, token)
            .subscribe(
              res => {
                if(res.status == 200){
                  console.log(JSON.parse(res['_body']));
                  let details = JSON.parse(res['_body'])['data']['details'];
                  console.log(details);
                  if(!details.laundryItems.length){
                    this.details.error = "Incomplete Order";
                    console.log(this.details);
                    
                  }else{
                    this.laundryItems = details['laundryItems'] || {};
                    console.log(this.laundryItems);
                    console.log('Empty Laundry Items', this.laundryItems.length);
                    this.locationForHTML = details['dropoff']['location']['address'];
                    console.log(this.laundryItems, this.locationForHTML);   
                  }                  
                }
              }
            )
        })
      
    }else{
      this.getData();
    }
    
  }
  
  getData = () => {
    this.laundryItems = JSON.parse(localStorage.getItem('Laundry Items'));
    this.locationForHTML = JSON.parse(localStorage.getItem('Location'))['formatted_address'];
    console.log(this.locationForHTML);
    console.log(this.laundryItems)
  }
  startNextScreen = () => {
    this.navCtrl.setRoot(OrderPlaced)
  }
}
