import { Component, ViewChild } from '@angular/core';
import {  } from 'ionic-angular';

@Component({
    selector: 'laundry-map',
    templateUrl: 'map.template.html'
})


export class LaundryMap{
    @ViewChid('map') laundryMap;
    map: any;
    constructor(){}


    initializeMap(){
        let latlng = new google.maps.LatLng(-34.9290, 138.6010)
        let mapOptions = {
            center: latlng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.laundryMap.nativeElement, mapOptions)
    }
}