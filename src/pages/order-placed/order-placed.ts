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
}