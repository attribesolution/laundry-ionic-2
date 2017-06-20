import { Component, 
         OnInit, 
         ViewChild,
         ElementRef,
        } from '@angular/core';
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
  lat: number = 0;
  lng: number;
  address: string;
  additionalInfoText: string;
  addition: any;
  inputFieldValue;
  preGenData: PreGenModel;
  latLng: string; 
  hide = false; 
  token: string; 
  isModalVisible: boolean; 
  deviceWidth: number; 
  deviceHeight: number; 
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
              private  savedLocationService: SavedLocationService) { 
                this.token = localStorage.getItem('x-access-token'); 
                this.userID = localStorage.getItem('userID'); 
                this.preGenData = navParams.get('preGenData'); 
                // setTimeout(() => { 
                //   this.inputFieldValue = 'New Value'; 
                // }, 3000) 
              } 

  ionViewDidLoad() {
    console.log('ionViewDidLoad IonicNativeMapPage');
    this.loadMap();
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

    
    // this.platform.ready().then(() => {
    //   // this.loadMap();
      
    // });

    this.listenToSearchInput();
    this.getMapLocation(location, this.latLng);
  }
  
  listenToSearchInput() {
    this.hide = false;
    let location: string;
    console.log('location1:', location)
    let searchInput$ = Observable.fromEvent(this.button.nativeElement, 'keyup')
      .map(e => location = e['srcElement'].value.trim())
      .distinctUntilChanged()
      .switchMap(() => this.mapService.getJSON(location, this.latLng)) 
    searchInput$.subscribe(location => {
      this.available_locations = location;
      console.log(this.available_locations);
    })
  }

  getMapLocation(location, latLng) { 
    if (location) {
      let location$ = this.mapService.getJSON(location, this.latLng);
      location$.subscribe(res => console.log)

    }
  }

    savedButtonClicked(myEvent) {
    
    this.saved = this.saved ? false : true;
    setTimeout(()=>{ 
      this.saved = this.saved ? false : true; 
 
    }, 200); 
    let inputs;
    this.addressResponse = inputs; 
        
    let URL = globalVars.getUsersAddress(this.userID);
    this.authService.getCall(URL).
      subscribe(res => {
        console.log(JSON.parse(res["_body"]));
        inputs = JSON.parse(res["_body"])["data"]["contact"]["address"];
        console.log(inputs);
        this.addressResponse = inputs;
        // let result = this.alertCntrl.checkBoxAlertDialog("Saved Locations", inputs)
        // console.log(result);
        

        this.radioAlertDialog("Saved Locations", inputs)

      })
    
  }


  radioAlertDialog(title: string, inputs){
        this.map.setClickable(false);
        let alert = this.alertCtrl.create({
            title: title,
            cssClass: 'alertTop'
        });

        inputs.forEach(input => {
            alert.addInput({
                type: 'radio',
                label: input.alias,
                value: input,
                checked: false
            });
        });

        alert.addButton({ 
            text: 'Cancel', 
            handler: () => { 
                console.log('Cancel clicked.'); 
                 
            } 
        }); 
        alert.addButton({
            text: 'Okay',
            handler: data => {
                console.log('Radio data:', data);
                // this.testCheckboxOpen = false;
                // this.testCheckboxResult = data;
                this.locationClicked(data); 
            }
        });
        alert.present();
        alert.onDidDismiss((data) => {
          console.log('OnDidDismiss', data); 
          // dataReturned = data; 
          this.map.setClickable(true); 
          return data || 'null'; 
        });

    }
  

  saveButtonClicked() {
    this.save = this.save ? false : true;
    setTimeout(()=>{ 
      this.save = this.save ? false : true; 
 
    }, 200);     
    console.log("saveButtonClicked");
    let userID = localStorage.getItem("userID");
    let URL = globalVars.UserAddress(userID);
    
    
    // console.log(locationExists);
    
    let data = {
      alias: this.locationAlias,
      address: this.address,
      lat: this.lat,
      long: this.lng
    }

    if(this.validate()){ 
      // let locationExists: boolean = false; 
      // this.addressResponse.forEach(address => { 
         
      //   locationExists = locationExists || (address.alias == this.locationAlias); 
         
      //   console.log(address.alias, this.locationAlias); 
         
      //   console.log(address.alias == this.locationAlias); 
         
      // }); 
      // console.log('location Exists: ', locationExists); 
      // if(!locationExists){ 
        this.authService.patchCall(URL, data) 
          .subscribe(res => { 
            if (res.status == 200) { 
              console.log(res['_body']); 
            } 
             
        }); 
      }else{ 
        this.map.setClickable(false); 
        this.alertCntrl.openAlertDialog('Location exits', 'Please enter a location.'); 
        this.map.setClickable(true); 
      } 
    // }else{ 
    //   // this.alertCntrl.openAlertDialog('Error', 'Location already Exists.') 
    // }
  }


  openAdditionalNoteDialog(myEvent) {

    this.map.setClickable(false); 
    this.isModalVisible = this.isModalVisible ? false : true; 
    setTimeout(() => { 
      this.isModalVisible = this.isModalVisible ? false : true; 
    }, 200); 
    let popover = this.popoverCtrl.create(AdditionalNote, {}, { showBackdrop: true });
    popover.present({
      ev: myEvent
    });
    popover.onDidDismiss(data => {
      if(data){

        this.map.setClickable(true);         
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

    this.hide = true; 
    if(!!location){
      this.inputFieldValue = ''; 
      if(!!location.name){ 
        console.log(location); 
        this.inputFieldValue = location.name || ''; 
        localStorage.setItem("Location", JSON.stringify(location));
        this.lat = location.geometry.location.lat;
        this.lng = location.geometry.location.lng;
        
        this.address = location.formatted_address;
        this.locationAlias = location.name;
      }else{
        console.log('Here');
        this.inputFieldValue = location.alias || '';
        localStorage.setItem("Location", JSON.stringify(location));
        this.lat = location.lat;
        this.lng = location.long;
        this.address = location.address;
        this.locationAlias = location.alias;
      };    
      setTimeout(() => { this.available_locations = []}, 200);
      }else{ 
        console.log('Here'); 
        this.inputFieldValue = location.alias || ''; 
        localStorage.setItem("Location", JSON.stringify(location)); 
        this.lat = location.lat; 
        this.lng = location.long; 
        this.address = location.address; 
        this.locationAlias = location.alias; 
      };     
      setTimeout(() => { this.available_locations = []}, 200); 
    //gMap = new google.maps.Map(document.getElementById('map')); 
    // this.postion =  new google.maps.LatLng(this.lat, this.lng);
    // this.map.setCenter(this.postion);
    // this.addMarkerMoveCamera(this.map, new LatLng(this.lat, this.lng));
    // this.map.center = new google.maps.LatLng(this.lat, this.lng);

    // this.addMarker(this.map, new LatLng(this.lat, this.lng));
    this.moveCamera(this.map, new LatLng(this.lat, this.lng))
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
    else{ 
      this.map.setClickable(false); 
      this.alertCntrl.openAlertDialog("What's missing?","No location selected."); 
    } 
  }

  loadMap(){
    let element: HTMLElement = ViewChild('map');
    let mapOptions = {
        "featureType": "all", 
        "elementType": "geometry", 
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
    this.map = map; 

    // listen to MAP_READY event
    // You must wait for this event to fire before adding something to the map or modifying it in anyway
    map.one(GoogleMapsEvent.MAP_READY).then( 
   () => { 
     console.log('Map is ready!'); 
     // Now you can add elements to the map like the marker 
     map.setOptions(mapOptions); 
     map.setMyLocationEnabled(true); 
     map.setBackgroundColor('black'); 
     map.setPadding(0, 80, 150, 0); 
     this.latLng = this.getLocation(map); 
     map.setCompassEnabled(false);   
   }); 
  } 
 
  getLocation(map: GoogleMap) { 
    let latLng: string; 
    map.getMyLocation().then( 
        location => { 
          latLng = location.latLng.lat + ',' + location.latLng.lng; 
          console.log("165", JSON.stringify(location)); 
          this.newLocation = new LatLng(location.latLng.lat, location.latLng.lng); 
           
          // this.addMarker(map, location.latLng); 
          this.moveCamera(map, location.latLng); 
      } 
    ).catch( 
      () => {
        console.log('Map is ready!');
        // Now you can add elements to the map like the marker
      }
    );
    return latLng;
  }
  moveCamera(map, latLng: LatLng){ 
    // create CameraPosition 
    let position: CameraPosition = { 
      target: latLng, 
      zoom: 16 
    }; 
    map.moveCamera(position); 
  } 
}
