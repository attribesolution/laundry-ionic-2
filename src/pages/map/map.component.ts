import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { NavController, NavParams,PopoverController,Popover } from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import { Http, Headers, RequestOptions } from '@angular/http';
// import { MapService } from '../pages/map/map.service';
import { MapService } from './map.service';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import {LaundryItems} from '../laundryitems/laundryitems';
import {AdditionalInfoModal} from '../modals/additional-info-modal/additional-info-modal.component';

declare var google;

  
@Component({
    selector: 'laundry-map',
    templateUrl: 'map.template.html',
    providers:[MapService]
})


export class LaundryMap implements AfterViewInit{
    // @ViewChid('map') laundryMap;
    @ViewChild('search') button: ElementRef;
    @ViewChild('map') mapElement: ElementRef;
    map: any;
    lat: number = 25.322327;
    lng: number = 55.513641;
    zoom: number = 10;
    saved :boolean;
    addition : boolean;
    save : boolean;
   available_locations: Array<Object> = []
    isModalVisible : boolean;
    popOver : Popover;
    constructor(private navCtrl: NavController, private mapService: MapService ,public popoverCtrl: PopoverController){
        this.ionViewLoaded();

    }
    ngAfterViewInit(){
        this.listenToSearchInput();
        this.loadMap();
        
        
    }
    listenToSearchInput(){
        let location: string;
        let searchInput$ = Observable.fromEvent(this.button.nativeElement, 'keyup')
            .map(e=> location = e['srcElement'].value.trim())
            .distinctUntilChanged()
            .switchMap(() => this.mapService.getJSON(location))
        searchInput$.subscribe(location => console.log(location))
    }


    getMapLocation(location){
        if(location){
            let location$ = this.mapService.getJSON(location)
              
            location$.subscribe(res=> this.available_locations = res)
        }
    }

  loadMap(){

  	Geolocation.getCurrentPosition().then((position) => {
	    let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

	    let mapOptions = {
	      center: latLng,
	      zoom: 15,
        styles: [
            {elementType: 'geometry', stylers: [{color: '#15151b'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative',
              elementType: 'labels',
              stylers: [{visibility: 'off'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{visibility: 'off'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{visibility: 'off'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{visibility: 'off'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#000000'}]
            }
            // #38414e
            ,
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#000000'}]//212a37
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#ffffff'}]//9ca5b3
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#000000'}]//746855
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'all',
              stylers: [{visibility: 'off'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{visibility: 'off'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{visibility: 'off'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{visibility: 'off'}]
            }
          ],
	      mapTypeId: google.maps.MapTypeId.ROADMAP,
        backgroundColor: 'none'
	    }

	    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

         this.map.controls[google.maps.ControlPosition.TOP_LEFT].push = 'none';

  	}, (err) => {
  		console.log(err);
  	});

  }

  addMarker(){

		let marker = new google.maps.Marker({
			map: this.map,
			animation: google.maps.Animation.drop,
			position: this.map.getCenter()
		});

		let content = "<h4>Information!</h4>";          

		this.addInfoWindow(marker, content);

  }

  addInfoWindow(marker, content){

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
       console.log("Pin drop");
    });

  }

  savedButtonClicked(){ 
    this.saved=this.saved?false:true;
    console.log("savedButtonClicked");
  }
  saveButtonClicked(){ 
    this.save=this.save?false:true;
    console.log("saveButtonClicked");
  }
  additionButtonClicked(){ 
    //this.isModalVisible=this.isModalVisible?false:true;
    console.log(this.addition);
    if(!this.isModalVisible)
      this.showAdditionalInfoModal();
    // else
    //   this.popOver.dismiss();
  }
  showAdditionalInfoModal(){  

    this.popOver = this.popoverCtrl.create(AdditionalInfoModal,{},{enableBackdropDismiss:true, cssClass:'additional-info-modal-styling'});
    this.popOver.present();
    let self = this;
    this.popOver.onDidDismiss(function(){
     self.setVisibleFlag(false);
    });
    this.setVisibleFlag(true);
    // let infoModal = this.modalCtrl.create(AdditionalInfoModal,{showBackdrop:true});
    // infoModal.isOverlay = true;
    // this.navCtrl.push(infoModal);
  }
setVisibleFlag(flag){
  this.isModalVisible = flag;
}
    startNextScreen()
    {
      this.navCtrl.push(LaundryItems);
      /*Todo start next screen*/
      console.log("Next clicked!");
    }
}

  
