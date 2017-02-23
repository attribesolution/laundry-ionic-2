import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component ({
    selector: 'congratulation-Component',
    templateUrl: 'order-placed.html'
})

export class OrderPlaced{
     constructor(){}


 done() {
   console.log("notification button clicked");
  }

}