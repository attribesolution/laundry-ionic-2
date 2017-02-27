import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SebmGoogleMap, SebmGoogleMapMarker } from 'angular2-google-maps/core';
import { Http, Headers, RequestOptions } from '@angular/http';
// import { MapService } from '../pages/map/map.service';
import { MapService } from './map.service';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'laundry-map',
    templateUrl: 'map.template.html',
    styles: [`
        .sebm-google-map-container {
            height: 350px;
        }
    `],
    providers:[MapService]
})


export class LaundryMap implements AfterViewInit{
    // @ViewChid('map') laundryMap;
    @ViewChild('search') button: ElementRef;
    map: any;
    lat: number = 25.322327;
    lng: number = 55.513641;
    zoom: number = 10;
    constructor(private navCtrl: NavController, private mapService: MapService){
    }
    ngAfterViewInit(){
        this.listenToSearchInput();
    }
    listenToSearchInput(){
        let location: string;
        let searchInput$ = Observable.fromEvent(this.button.nativeElement, 'keyup')
            .map(e=> location = e['srcElement'].value.trim())
            .distinctUntilChanged()
            .switchMap(() => this.mapService.getJSON(location))
        searchInput$.subscribe(location=> console.log(location))
    }

    getMapLocation(location){
        if(location)
            this.mapService.getJSON(location)
                .subscribe(res=> console.log(res))
    }
}