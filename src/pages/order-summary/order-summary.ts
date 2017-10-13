import { LoaderComponent } from './../loader/loader';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { OrderPlaced } from '../order-placed/order-placed';

import { OrderSummaryService } from './order-summary.service';
import { globalVars } from '../../app/globalvariables';
import { AuthService } from "../../auth/auth.service";
@Component({
  selector: 'page-order-summary',
  templateUrl: 'order-summary.html',
  providers: [
    AuthService,
    OrderSummaryService,
    Storage
    ]
})
export class OrderSummaryPage {
  eta: string;
  laundryItems: any;
  locationForHTML: any;
  orderID: string;
  pickUpTime: string;
  dropOffTime: string;
  showFooter: boolean = false;
  details = {
    error: ''
  };
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private orderSummaryService: OrderSummaryService,
              private storage: Storage,
              private authService: AuthService) {
                this.orderID = this.navParams.get('orderID');
                this.showFooter = this.navParams.get('navigateFromOrderHistory') || false;
              }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderSummaryPage');
    
    console.log(this.orderID);
    let token = localStorage.getItem('x-access-token')
    if(!!this.orderID && !! token){
      let URL = globalVars.getOrderByIdURL(this.orderID);
      
      console.log(URL);
      
      
          this.authService.getCall(URL)
            .subscribe(
              res => {
                if(res.status == 200){
                  console.log(res);
                  
                  console.log(JSON.parse(res['_body']));
                  let details = JSON.parse(res['_body'])['data']['details'];
                  console.log(details);
                  if(!details.laundryItems.length){
                    this.details.error = "Incomplete Order";
                    console.log(this.details);
                    // this.locationForHTML = details['pickup']['location']['address'];
                  }else{
                    this.eta = (JSON.parse(res['_body'])['data']['expectedDeliveryDate']).slice(0, 10);
                    this.laundryItems = details['laundryItems'] || {};
                    console.log(this.laundryItems);
                    console.log('Empty Laundry Items', this.laundryItems.length);
                    this.locationForHTML = details['pickup']['location']['address'];
                    console.log(this.laundryItems, this.locationForHTML);   
                    this.pickUpTime = (details['pickup']['when']).slice(0, 10);
                  }                  
                }
              }
            )
        // })
      
    }else{
      this.getData();
    }
    
  }
  
  getData = () => {
    this.laundryItems = JSON.parse(localStorage.getItem('Laundry Items'));
    this.locationForHTML = JSON.parse(localStorage.getItem('Location')); 
    this.locationForHTML = this.locationForHTML.address ?  
      this.locationForHTML.address : this.locationForHTML.formatted_address;     console.log(this.locationForHTML);
    console.log(this.laundryItems);
    this.pickUpTime = (JSON.parse(localStorage.getItem('dates'))['pickUpDate']).slice(0, 10);
    console.log(this.pickUpTime);
    this.eta = (JSON.parse(localStorage.getItem('dates'))['dropOffDate']).slice(0, 10);
  }
  startNextScreen = () => {
    this.navCtrl.setRoot(LoaderComponent)
  }
}
