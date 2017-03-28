import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { NavController, NavParams,PopoverController,Popover } from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import { Http, Headers, RequestOptions } from '@angular/http';
import { MapService } from './map.service';
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import { LaundryItems } from '../laundryitems/laundryitems';
import { AdditionalNote } from '../modals/additional-note/additional-note';
import { SavedLocations } from '../modals/saved-locations/saved-locations';
declare var google;
import { PreGenModel } from "../../models/preGen.model";

import { globalVars } from "../../app/globalvariables";
  
@Component({
    selector: 'laundry-map',
    templateUrl: 'map.template.html',
    providers:[MapService]
})


export class LaundryMap implements AfterViewInit{
    @ViewChild('search') button: ElementRef;
    @ViewChild('map') mapElement: ElementRef;
    map: any;
    zoom: number = 10;
    saved :boolean;
    addition : boolean;
    save : boolean;
    available_locations: Array<Object> = []
    isModalVisible : boolean;
    popOver : Popover;
    postion : any;
    preGenData: PreGenModel;
    preGenApiURL = globalVars.PreGenApiURL();
    address: string; 
    lat: number; 
    lng: number;
    locationAlias: string;
    inputFieldValue: string = '';
    search1;
    addressReponse: any;
    constructor(private navCtrl: NavController, private mapService: MapService ,public popoverCtrl: PopoverController){
      console.log(this.search1);
      this.createPreGen();  

    }
    ngAfterViewInit(){
        
        this.listenToSearchInput();
        // this.loadMap();
        this.getMapLocation(location);
    }
    ionViewDidLoad(){
        this.loadMap();      
    }
    createPreGen(){
        this.mapService.hitPreGen(this.preGenApiURL)
          .subscribe(res => {
            if(res.status == 200) {
              let response = JSON.parse(res['_body'])
              this.preGenData = {
                href: response["href"],
                data: response["data"]
              }
              console.log('Response From PreGen', (this.preGenData.data as any)._id); 
            }
        });
    }
    listenToSearchInput(){
        let location: string;
        console.log('location1:',location)
        let searchInput$ = Observable.fromEvent(this.button.nativeElement, 'keyup')
            .map(e=> location = e['srcElement'].value.trim())
            .distinctUntilChanged()
            .switchMap(() => this.mapService.getJSON(location))
        searchInput$.subscribe(location => {
          this.available_locations = location;
          console.log(this.available_locations);
        })
    }


    getMapLocation(location){
        if(location){
            let location$ = this.mapService.getJSON(location)
              
            location$.subscribe(res=> console.log)
            
        }
    }

  loadMap(){

    console.log("load map called");
  	Geolocation.getCurrentPosition().then((position) => {
	    this.postion = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

	    let mapOptions = {
	      center: this.postion,
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

          console.log("map loaded");
  	}, (err) => {
  		console.log("error = ",err);
  	});

  }

  addMarker(){
     
		let marker = new google.maps.Marker({
			map: this.map,
			animation: google.maps.Animation.drop,
			// position: this.map.getCenter(),
      draggable:false,
      optimized:false, // <-- required for animated gif
      position: this.postion,
      icon: "./assets/gifs/ripple_marker_Orange.gif"
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

  savedButtonClicked(myEvent){ 
    this.saved=this.saved?false:true;
    console.log("savedButtonClicked");
    let userID = localStorage.getItem("userID");
    let URL = globalVars.UserAddress(userID);
    this.mapService.getAddress(URL)
      .subscribe(res =>{
        res.status == 200 ? this.addressReponse = ["_body"]: this.addressReponse = null;
      });
    this.addition=this.addition?false:true;
    this.openSavedLocationModal(myEvent);
  }
  openSavedLocationModal(myEvent)
  {
    let popover = this.popoverCtrl.create(SavedLocations, {}, {showBackdrop: true});
    popover.present({
      ev: myEvent
    });
    this.saved = this.saved?false:true;
  }

  saveButtonClicked(){ 
    this.save=this.save?false:true;
    console.log("saveButtonClicked");
    let userID = localStorage.getItem("userID");
    let URL = globalVars.UserAddress(userID);
    let data = {
      alias : this.locationAlias,
      address: this.address,
      lat: this.lat,
      long: this.lng
    }
    this.mapService.patchAddress(URL, data);
  }


  openAdditionalNoteDialog(myEvent)
  {
    let popover = this.popoverCtrl.create(AdditionalNote, {}, {showBackdrop: true});
    popover.present({
      ev: myEvent
    });
  }

  additionButtonClicked(myEvent){ 
    this.addition=this.addition?false:true;
    console.log("additionButtonClicked");
    this.openAdditionalNoteDialog(myEvent);
  }

  locationClicked(location){
    console.log("You have clicked on: ", location);
    this.available_locations = undefined;
    this.inputFieldValue = location.formatted_address;
    localStorage.setItem("Location", JSON.stringify(location));
    this.lat = location.geometry.location.lat;
    this.lng = location.geometry.location.lng;
    this.address = location.formatted_address;
    this.locationAlias = location.name;
  }
      
    startNextScreen(){
      console.log(this.preGenData);  
      this.navCtrl.push(LaundryItems, {
        preGenData: this.preGenData,
        pickupDetails: {
          location: {
            lat: this.lat,
            lng: this.lng,
            address: this.address
          }
        },
        
      });
      /*Todo start next screen*/
      console.log("Next clicked!");
    }
}

  
