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
                    let time = new Date(JSON.parse(res['_body'])['data']['expectedDeliveryDate']);
                    this.eta = time.toISOString().slice(0, 10);
                    this.eta += ' ' + this.timeTo12HrFormat(time.toTimeString());
                    this.laundryItems = details['laundryItems'] || {};
                    console.log(this.laundryItems);
                    console.log('Empty Laundry Items', this.laundryItems.length);
                    this.locationForHTML = details['pickup']['location']['address'];
                    console.log(this.laundryItems, this.locationForHTML);   
                    let pickUpTime = new Date(details['pickup']['when']);
                    this.pickUpTime = pickUpTime.toISOString().slice(0, 10);
                    this.pickUpTime += ' ' + this.timeTo12HrFormat(pickUpTime.toTimeString());
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
    let pickupTime = new Date(JSON.parse(localStorage.getItem('dates'))['pickUpDate'])
    this.pickUpTime = pickupTime.toISOString().slice(0, 10) + ' ' + (this.timeTo12HrFormat(pickupTime.toTimeString()));
    console.log(this.pickUpTime);
    let time = new Date(JSON.parse(localStorage.getItem('dates'))['dropOffDate']);
    this.eta = time.toISOString().slice(0, 10) + ' ' + this.timeTo12HrFormat(time.toTimeString());

  }
  startNextScreen = () => {
    this.navCtrl.setRoot(LoaderComponent)
  }

  timeTo12HrFormat(time)
  {   // Take a time in 24 hour format and format it in 12 hour format
      let time_part_array = time.split(":");
      console.log(time_part_array)
      let ampm = 'AM';
  
      if (time_part_array[0] >= 12) {
          ampm = 'PM';
      }
  
      if (time_part_array[0] > 12) {
          time_part_array[0] = time_part_array[0] - 12;
      }
  
      let formatted_time = time_part_array[0] + ':' + time_part_array[1] + ' ' + ampm;
  
      return formatted_time;
  }
  
  
  
  // var time = timeTo12HrFormat(18:00:00);
}
