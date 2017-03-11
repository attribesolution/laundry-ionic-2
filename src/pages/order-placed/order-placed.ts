import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';

declare var google;

@Component ({
    selector: 'congratulation-Component',
    templateUrl: 'order-placed.html'
})

export class OrderPlaced{

     @ViewChild('map') mapElement: ElementRef;
     map: any;

 done() {
   console.log("notification button clicked");
  }

  startNextScreen()
  {
      /*Todo start next screen*/
      console.log("Next clicked!");
  }

     constructor(private navCtrl: NavController){}
}