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
    map: GoogleMap;;
    constructor(){}


    // initializeMap(){
    //     let latlng = new google.maps.LatLng(-34.9290, 138.6010)
    //     let mapOptions = {
    //         center: latlng,
    //         zoom: 15,
    //         mapTypeId: google.maps.MapTypeId.ROADMAP
    //     };
    //     this.map = new google.maps.Map(this.laundryMap.nativeElement, mapOptions)
    // }

// Load map only after view is initialize
ngAfterViewInit() {
 this.loadMap();
}

loadMap() {
    let element : HTMLElement =  document.getElementById('map');
     let location = new GoogleMapsLatLng(-34.9290,138.6010);
 
        this.map = new GoogleMap(element, {
          'backgroundColor': 'white',
          'controls': {
            'compass': true,
            'myLocationButton': true,
            'indoorPicker': true,
            'zoom': true
          },
          'gestures': {
            'scroll': true,
            'tilt': true,
            'rotate': true,
            'zoom': true
          },
          'camera': {
            'latLng': location,
            'tilt': 30,
            'zoom': 15,
            'bearing': 50
          }
        });
 
        this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
            console.log('Map is ready!');
        });
 
 }

}