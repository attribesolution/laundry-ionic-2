import { Component, 
         OnInit, 
         ViewChild,
         ElementRef } from '@angular/core';
import { NavController,
         NavParams, 
         Platform, 
         ToastController,
         AlertController,
         PopoverController } from 'ionic-angular';
import { GoogleMaps, 
         GoogleMap, 
         GoogleMapsEvent,
         LatLng,
         CameraPosition,
         MarkerOptions,
         Marker   
        } from "@ionic-native/google-maps";
import { Geolocation } from '@ionic-native/geolocation';
import { AndroidPermissions } from '@ionic-native/android-permissions';

import { Observable } from 'rxjs/Observable';

import { AuthService } from "../../auth/auth.service";
import { MapService } from "../map/map.service";
import { globalVars } from "../../app/globalvariables";  
import { SavedLocations } from "../modals/saved-locations/saved-locations";      
import { SavedLocationService } from "../modals/saved-locations/saved-location.service";
import { PreGenModel } from "../../models/preGen.model";
import { AdditionalNote } from "../modals/additional-note/additional-note";
import { LaundryItems } from "../laundryitems/laundryitems";
import { AlertDialogFactory } from "../../app/alert.dialog";
/*
  Generated class for the IonicNativeMap page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-ionic-native-map',
  templateUrl: 'ionic-native-map.html',
  providers: [GoogleMaps, 
              Geolocation, 
              AndroidPermissions, 
              MapService,
              AuthService,
              AlertDialogFactory,
              SavedLocationService
              ]
})
export class IonicNativeMapPage {
  map: GoogleMap;
  save: boolean;
  saved: boolean;
  userID: string;
  addressResponse: any;
  locationAlias: string;
  lat: number;
  lng: number;
  address: string;
  additionalInfoText: string;
  addition: any;
  inputFieldValue: string;
  preGenData: PreGenModel;
  @ViewChild('search') button: ElementRef;
  available_locations: Array<Object> = [];
  newLocation;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private googleMaps: GoogleMaps,
              private platform: Platform,
              private geolocation: Geolocation,
              private androidPermissions: AndroidPermissions,
              private alertCtrl: AlertController,
              private popoverCtrl: PopoverController,
              private mapService: MapService,
              private authService: AuthService,
              private alertCntrl: AlertDialogFactory,
              private  savedLocationService: SavedLocationService) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad IonicNativeMapPage');
  }
  ngAfterViewInit(){
    console.log("ngAfterViewInit", this.newLocation);
    // this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION).then(
    //   success => console.log('Permission granted'),
    //   err => this.androidPermissions.requestPermissions(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION)
    // );

    // this.geolocation.getCurrentPosition().then((resp) => {
    // console.log(resp.coords.latitude);
    // console.log(resp.coords.longitude);
    // }).catch((error) => {
    //   console.log('Error getting location', error);
    // });
    
    this.platform.ready().then(() => {
      this.loadMap();
      this.listenToSearchInput();
      this.getMapLocation(location);
    });
  }
  
  listenToSearchInput() {
    let location: string;
    console.log('location1:', location)
    let searchInput$ = Observable.fromEvent(this.button.nativeElement, 'keyup')
      .map(e => location = e['srcElement'].value.trim())
      .distinctUntilChanged()
      .switchMap(() => this.mapService.getJSON(location))
    searchInput$.subscribe(location => {
      this.available_locations = location;
      console.log(this.available_locations);
    })
  }

  getMapLocation(location) {
    if (location) {
      let location$ = this.mapService.getJSON(location)

      location$.subscribe(res => console.log)

    }
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
    // this.postion =  new google.maps.LatLng(this.lat, this.lng);
    // this.map.setCenter(this.postion);
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
    
  }

  loadMap(){
    let element: HTMLElement = ViewChild('map');
    let mapOptions = {
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
        ]
        // mapTypeId: google.maps.MapTypeId.ROADMAP1
      };
    let map: GoogleMap = this.googleMaps.create(element);
    map = new GoogleMap('map');
    
    // listen to MAP_READY event
    // You must wait for this event to fire before adding something to the map or modifying it in anyway
    map.one(GoogleMapsEvent.MAP_READY).catch(
      () => {
        console.log('Map is ready!');
        // Now you can add elements to the map like the marker
      }
    );
    // create LatLng object
    // this.newLocation = new LatLng(25.276987,55.296249);
    map.setMyLocationEnabled(true);
    map.setBackgroundColor('black');
    map.setOptions(mapOptions);
    map.setPadding(150, 120, 100, 0);
    map.getMyLocation().then(
      location => {
        console.log("165", JSON.stringify(location));
        this.newLocation = new LatLng(location.latLng.lat, location.latLng.lng);
        // create CameraPosition
        let position: CameraPosition = {
          target: this.newLocation,
          zoom: 10
        };
        map.moveCamera(position);
    }).catch(
          err => {
            console.log('409:', JSON.stringify(err), 'Error occurred.');
            
          }
        )
    

    // // move the map's camera to position
    // map.moveCamera(position);

    // // create new marker
    // let markerOptions: MarkerOptions = {
    //   position: this.newLocation,
    //   title: ''
    // };
  }
}