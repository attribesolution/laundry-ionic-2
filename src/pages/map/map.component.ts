import { Component, 
         ElementRef, 
         ViewChild, 
         AfterViewInit 
        } from '@angular/core';
import { NavController, 
         NavParams, 
         PopoverController, 
         Popover, 
         AlertController,
         ToastController,
         Platform
       } from 'ionic-angular';
import { 
         Http, 
         Headers, 
         RequestOptions
       } from '@angular/http'; 
import { GoogleMaps, 
         GoogleMap, 
         GoogleMapsEvent,
         LatLng,
         CameraPosition,
         MarkerOptions,
         Marker   
        } from "@ionic-native/google-maps";             
// import { Geolocation } from 'ionic-native';
import { MapService } from './map.service';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { AndroidPermissions } from "@ionic-native/android-permissions";


import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';

import { AuthService } from "../../auth/auth.service";
import { AlertDialogFactory } from '../../app/alert.dialog'
import { LaundryItems } from '../laundryitems/laundryitems';
import { AdditionalNote } from '../modals/additional-note/additional-note';
import { SavedLocations } from '../modals/saved-locations/saved-locations';
import { SavedLocationService } from "../modals/saved-locations/saved-location.service";

import { PreGenModel } from "../../models/preGen.model";

import { globalVars } from "../../app/globalvariables";

// declare var google;

@Component({
  selector: 'laundry-map',
  templateUrl: 'map.template.html',
  providers: [
    MapService, 
    GoogleMaps,
    // Geolocation,
    AuthService, 
    AndroidPermissions,
    AlertDialogFactory, 
    SavedLocationService]
})


export class LaundryMap implements AfterViewInit{
    @ViewChild('search') button: ElementRef;
    // @ViewChild('map') mapElement: ElementRef;
    mapElement: HTMLElement = ViewChild('map');
    
    zoom: number = 10;
    saved :boolean;
    addition : boolean;
    save : boolean;
    available_locations: Array<Object> = []
    isModalVisible : boolean;
    popOver : Popover;
    postion : any;
    preGenData: PreGenModel;
    address: string; 
    lat: number; 
    lng: number;
    
    locationAlias: string;
    inputFieldValue: string = '';
    addressResponse: any;
    userID: string;
    token: string;
    mapLoadErr: any;
    additionalInfoText: string;
    marker;

    map: GoogleMap;
    LatLong: LatLng = new LatLng(43.0741904,-89.3809802);
    constructor(private storage: Storage,
                private platform: Platform,
                private navParams: NavParams,
                private googleMaps: GoogleMaps, 
                private navCtrl: NavController,
                private mapService: MapService,
                // private geolocation: Geolocation,
                private authService: AuthService,
                private alertCtrl: AlertController,
                private popoverCtrl: PopoverController,
                private alertCntrl: AlertDialogFactory,
                private toastController: ToastController,
                private adroidPermissions: AndroidPermissions,
                private savedLocationsService: SavedLocationService,
                ){
      // this.marker = new google.maps.Marker(null);
      this.token = localStorage.getItem('x-access-token');
      this.userID = localStorage.getItem('userID');
      this.preGenData = navParams.get('preGenData');
      // this.createPreGen(this.preGenApiURL, this.token);
  }
  ngAfterViewInit() {
    console.log("ngAfterViewInit", this.LatLong);
    
    this.platform.ready().then(() => {
      this.loadMap();
    });
    this.listenToSearchInput();
    this.getMapLocation(location);
  }
  ionViewDidLoad() {
    // this.getCurrentPosition();
    this.loadMap();
  }

  
  
  listenToSearchInput() {
    let location: string;
    let latLng;
    console.log('location1:', location)
    let searchInput$ = Observable.fromEvent(this.button.nativeElement, 'keyup')
      .map(e => location = e['srcElement'].value.trim())
      .distinctUntilChanged()
      .switchMap(() => this.mapService.getJSON(location, latLng))
    searchInput$.subscribe(location => {
      this.available_locations = location;
      console.log(this.available_locations);
    })
  }


  getMapLocation(location) {
    if (location) {
      let latLng;
      let location$ = this.mapService.getJSON(location, latLng)

      location$.subscribe(res => console.log)

    }
  }

  // getCurrentPosition(){
  //   Geolocation.getCurrentPosition()
  //     .then(
  //       position => {
  //         console.log('No error');
          
  //         this.postion = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  //         // this.addMarker();
  //       },
  //       err => {
  //         console.log("Error", err);
  //         if(err.code == 1){
  //           this.alertCntrl.openAlertDialog("Location Error?","Please turn on location from settings.");
  //         }
  //       }
  //     )
  // }

  loadMap() {
    let element:  HTMLElement = ViewChild('map');
    console.log("load map called");
  	// Geolocation.getCurrentPosition().then((position) => {
	  //   this.postion = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    //   console.log(this.postion);
      
      let mapOptions = {
          center: this.LatLong,
          zoom: 15,
          styles: [
            { elementType: 'geometry', stylers: [{ color: '#15151b' }] },
            { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
            { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
            {
              featureType: 'administrative',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            },
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{ visibility: 'off' }]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{ visibility: 'off' }]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{ color: '#000000' }]
            }
            // #38414e
            ,
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{ color: '#000000' }]//212a37
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#ffffff' }]//9ca5b3
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{ color: '#000000' }]//746855
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{ color: '#1f2835' }]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#f3d19c' }]
            },
            {
              featureType: 'transit',
              elementType: 'all',
              stylers: [{ visibility: 'off' }]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{ visibility: 'off' }]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{ color: '#17263c' }]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{ visibility: 'off' }]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{ visibility: 'off' }]
            }
          ],
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          backgroundColor: 'black',
          gestureHandling: 'cooperative'
        }

      this.map = this.googleMaps.create(element);
      // this.map = this.googleMaps.create(this.mapElement, mapOptions);
      console.log(JSON.stringify(this.map));
      // listen to MAP_READY event
    // You must wait for this event to fire before adding something to the map or modifying it in anyway
      this.map.one(GoogleMapsEvent.MAP_READY).catch(
        () => {
          console.log('Map is ready');
          // Now you can add elements to the map like the marker
      });

      this.map.getMyLocation().then(
      location => {
        console.log(JSON.stringify(location));
        
        this.map.moveCamera(location.latLng);
        let markerOptions: MarkerOptions = {
          position: this.LatLong,
          title: ''
        };

        const marker = this.map.addMarker(markerOptions).then(() => {

        })
      }).catch(
          err => {
            console.log(JSON.stringify(err), 'Error occurred.');
          });
  }
  
  // addMarker() {
  //   this.marker.setMap(null)
  //   this.marker = new google.maps.Marker({
  //     map: this.map,
  //     animation: google.maps.Animation.drop,
  //     // position: this.map.getCenter(),
  //     draggable: false,
  //     optimized: false, // <-- required for animated gif
  //     position: this.postion,

  //     icon: "./assets/gifs/ripple_marker_Orange.gif"
	// 	});


  //   let content = "<h4>Information!</h4>";

  //   this.addInfoWindow(this.marker, content);

  // }

  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      // infoWindow.open(this.map, marker);
      console.log("Pin drop");
    });

  }

  savedButtonClicked(myEvent) {
    this.saved = this.saved ? false : true;
    // console.log("savedButtonClicked");
    
    // this.addition=this.addition?false:true;
    // this.openSavedLocationModal(myEvent);
    let inputs;
    let URL = globalVars.getUsersAddress(this.userID);
    this.authService.getCall(URL).
      subscribe(res => {
        console.log(JSON.parse(res["_body"]));
        inputs = JSON.parse(res["_body"])["data"]["contact"]["address"];
        console.log(inputs);
        // let result = this.alertCntrl.checkBoxAlertDialog("Saved Locations", inputs)
        // console.log(result);
        
        this.checkBoxAlertDialog("Saved Locations", inputs)



      })
    
  }

  checkBoxAlertDialog(title: string, inputs){
        let alert = this.alertCtrl.create({
            title: title,
        });

        inputs.forEach(input => {
            alert.addInput({
                type: 'radio',
                label: input.alias,
                value: input,
                checked: false
            });
        });
        alert.addButton('Cancel');
        alert.addButton({
            text: 'Okay',
            handler: data => {
                console.log('Checkbox data:', data);
                // this.testCheckboxOpen = false;
                // this.testCheckboxResult = data;
            }
        });
        alert.present();
        alert.onDidDismiss((data) => {
          console.log(data);
            data ? 
              this.locationClicked(data[0]) : null;
        });

    }
  openSavedLocationModal(myEvent) {
    let popover = this.popoverCtrl.create(SavedLocations, { address: this.addressResponse }, { showBackdrop: true });
    popover.present({
      ev: myEvent
    });
    this.saved = this.saved ? false : true;
    popover.onDidDismiss(popoverAddress => {
      console.log(popoverAddress);
      popoverAddress ? 
        this.locationClicked(popoverAddress) : '';
    });
  }

  saveButtonClicked() {
    this.save = this.save ? false : true;
    console.log("saveButtonClicked");
    let userID = localStorage.getItem("userID");
    let URL = globalVars.UserAddress(userID);
    let data = {
      alias: this.locationAlias,
      address: this.address,
      lat: this.lat,
      long: this.lng
    }
    this.authService.patchCall(URL, data)
      .subscribe(res => {
        if (res.status == 200) {
          console.log(res['_body']);
        }

      });
  }


  openAdditionalNoteDialog(myEvent) {
    let popover = this.popoverCtrl.create(AdditionalNote, {}, { showBackdrop: true });
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss(data => {
      if(data){
        console.log(data);
        this.additionalInfoText = data + "\n";
        localStorage.setItem("additionalInfoText", this.additionalInfoText);
      }
    })
  }

  additionButtonClicked(myEvent) {
    this.addition = this.addition ? false : true;
    console.log("additionButtonClicked");
    this.openAdditionalNoteDialog(myEvent);
  }

  locationClicked(location) {
    console.log("You have clicked on: ", location);
    
    if(!!location){
      if(!!location.formatted_address){
        this.inputFieldValue = location.formatted_address;
        localStorage.setItem("Location", JSON.stringify(location));
        this.lat = location.geometry.location.lat;
        this.lng = location.geometry.location.lng;

        this.address = location.formatted_address;
        this.locationAlias = location.name;
      }      
    }else{
      this.inputFieldValue = location.address;
      localStorage.setItem("Location", JSON.stringify(location));
      this.lat = location.lat;
      this.lng = location.long;
      this.address = location.address;
      this.locationAlias = location.alias;
    };
    
    //gMap = new google.maps.Map(document.getElementById('map')); 
    this.postion =  new google.maps.LatLng(this.lat, this.lng);
    this.map.setCenter(this.postion);
    // this.addMarker();
    // this.map.center = new google.maps.LatLng(this.lat, this.lng);
  }

  validate():boolean
  {
    return (this.lat != null && this.lng != null && this.address != null) ? true :false;
  }
  startNextScreen() {
    console.log("Next clicked!");
    let valid:boolean  = this.validate();
    console.log(valid);

    if(valid === true)
    {
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
    }
    else
      this.alertCntrl.openAlertDialog("What's missing?","No location selected.");
    
      // Temporary hack Delete it
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
  }
  presentToast(){
    
  }
}


