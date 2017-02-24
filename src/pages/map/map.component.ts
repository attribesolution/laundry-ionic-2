import { Component, ViewChild } from '@angular/core';
import {
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapsLatLng,
 CameraPosition,
 GoogleMapsMarkerOptions,
 GoogleMapsMarker
} from 'ionic-native';
import { Nav, Platform } from 'ionic-angular';

@Component({
    selector: 'laundry-map',
    templateUrl: 'map.template.html'
})


export class LaundryMap{
    // @ViewChid('map') laundryMap;
    map: any;
    lat: number = 25.322327;
    lng: number = 55.513641;
    zoom: number = 10;
    constructor(){}

    getMapLocation($event){
        let location = $event.value;
        console.log()
    }

}