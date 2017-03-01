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

     constructor(private navCtrl: NavController){}
ionViewLoaded(){
    this.loadMap();
  }
 
  loadMap(){
 
    let latLng = new google.maps.LatLng(-34.9290, 138.6010);
 
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
 
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
 
  }

 done() {
   console.log("notification button clicked");
  }

}