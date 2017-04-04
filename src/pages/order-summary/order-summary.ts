import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { OrderPlaced } from '../order-placed/order-placed';
@Component({
  selector: 'page-order-summary',
  templateUrl: 'order-summary.html'
})
export class OrderSummaryPage {
  laundryItems: any;
  location: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {}
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderSummaryPage');
    this.getData();
  }
  
  getData = () => {
    this.laundryItems = JSON.parse(localStorage.getItem('Laundry Items'));
    this.location = JSON.parse(localStorage.getItem('Location'));
    console.log(this.location);
  }
  startNextScreen = () => {
    this.navCtrl.setRoot(OrderPlaced)
  }
}
