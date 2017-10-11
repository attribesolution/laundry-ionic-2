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
    disabled: true,
    htmlValue: 'Cash On Delivery'
  };
  creditCard = {
    name: 'creditCard',
    checked: false,
    disabled: true,
    htmlValue: 'Credit Card',
    helperValueHtml: 'Credit Card payment coming soon.'
  };
  payPal = {
    name: 'payPal',
    checked: false,
    disabled: true,
    htmlValue: 'PayPal',
    helperValueHtml: 'PayPal payment coming soon.'
  };
  methods = [this.cashOnDelivery, this.creditCard, this.payPal];
  toggleMethod(method){
    console.log(method.name, ' is ', method.checked);
    method == 'cashOnDelivery' ? this.creditCard.checked = false : this.cashOnDelivery.checked = true;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentMethodsPage');
  }

}
