import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {CareInstructions} from '../care-instructions/care-instructions';

/*
  Generated class for the Services page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-services',
  templateUrl: 'services.html'
})
export class ServicesPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}
  
  buttons: any = [
    ['COLD WASH', 'HOT WASH'],
    ['LOW DRY', 'REGULAR DRY'],
    ['SCENTED', 'NO SCENT'],
    ['SOFTNER', 'NO SOFTNER']
  ];

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicesPage');
  }

  imageClicked(){
    console.log('Image Clicked');
  }

  setClass(index){
    return index ? "services-page-unselected" : "services-page-selected";
  }

  setFontColor(index){
    return index ? "#59bd84": "#000";
  }

  startNextScreen()
  {
      this.navCtrl.push(CareInstructions);
      console.log("Next clicked!");
  }

}
