import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SebmGoogleMap, SebmGoogleMapMarker } from 'angular2-google-maps/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx'
import 'rxjs/add/operator/map';

@Component({
    selector: 'laundry-map',
    templateUrl: 'map.template.html',
    styles: [`
        .sebm-google-map-container {
            height: 350px;
        }
    `]
})


export class LaundryMap{
    // @ViewChid('map') laundryMap;
    map: any;
    lat: number = 25.322327;
    lng: number = 55.513641;
    zoom: number = 10;
    constructor(private navCtrl: NavController, private http: Http){}

    getMapLocation($event){

        let searchKey = $event.srcElement.value.toLowerCase().trim();

        let apikey = 'AIzaSyClwzFHgEdw9cmOYtKmGcvyTEN3nK4gXiY';
        let headers = new Headers({ 'Accept': 'application/json' });
        headers.append('Authorization', `Bearer ${apikey}`);
        
        let callMapTypeAhead = function(){
            
        }
        let options = new RequestOptions({ headers: headers });
        let googleLocationApi = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=123+main+street&key=${apikey}`;

        let location$ = this.http.get(googleLocationApi)
            .map(res => res.json())

        location$.subscribe(res=> console.log(res));

    }

}