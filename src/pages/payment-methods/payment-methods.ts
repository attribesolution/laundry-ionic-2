import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-payment-methods',
  templateUrl: 'payment-methods.html'
})
export class PaymentMethodsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}
  cashOnDelivery = {
    name: 'cashOnDelivery',
    checked: true,
    disabled: false,
    htmlValue: 'Cash On Delivery'
  };
  creditCard = {
    name: 'creditCard',
    checked: false,
    disabled: true,
    htmlValue: 'Credit Card',
    helperValueHtml: 'Credit Card payment soon to be included.'
  };
  methods = [this.cashOnDelivery, this.creditCard];
  toggleMethod(method){
    console.log(method);
    method == 'cashOnDelivery' ? this.creditCard.checked = false : this.cashOnDelivery.checked = true;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentMethodsPage');
  }

}
