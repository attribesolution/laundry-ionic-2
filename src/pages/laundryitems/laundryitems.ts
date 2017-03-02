import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';


@Component ({
    selector: 'laundry_items',
    templateUrl: 'laundryitems.html'
})

export class LaundryItems{
  selectedItem: any;
  icons: string[];
  titles: string[];
  items: Array<{title: string, icon: string, qty: number, price: number, total:number, dry:boolean, wash:boolean}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

     this.titles = ['Jacket', 'T-shirt', 'Jeans', 'Tides', 'Coat', 'Suit',
    'Blanket', 'Socks', 'Curtains', 'Towels'];


    this.items = [];
    for (let i = 1; i < this.icons.length; i++) {
      this.items.push({
        title: this.titles[i],
        icon: this.icons[i],
        qty: 0,
        price: i,
        total: 0.0,
        dry: false,
        wash:false
      });
    }

}

// increment product qty
  incrementQty(item) {
    item.qty++;
    item.total=item.price*item.qty;
     console.log('Item '+ item.title+ 'Qty ' + item.qty + 'Price' + item.price + 'Total' + item.total);
  }

  // decrement product qty
  decrementQty(item) {
    if(item.qty < 1 ){
      item.qty = 0
      item.total=item.price*item.qty;
      console.log('Item '+ item.title+ 'Qty ' + item.qty + 'Price' + item.price + 'Total' + item.total);
    }else{
      item.qty--;
      item.total=item.price*item.qty;
       console.log('Item '+ item.title+ 'Qty ' + item.qty + 'Price' + item.price + 'Total' + item.total);
   
    }
  }

  wash(item)
  {
    item.wash?item.wash=false:item.wash=true;
    console.log('wash'+item.wash);
  }
  dry(item)
  {
    item.dry?item.dry=false:item.dry=true;
    console.log('dry'+item.dry);
  }

 startNextScreen()
  {
      /*Todo start next screen*/
      console.log("Next clicked!");
  }
}