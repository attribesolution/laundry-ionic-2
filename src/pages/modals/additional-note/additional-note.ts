import { NavController ,ViewController, PopoverController } from 'ionic-angular';
import {Component} from '@angular/core';

@Component ({
    templateUrl:'additional-note.html',
    selector: 'additional-note'
   
})
export class AdditionalNote
{
    data;
    constructor(public viewCtrl: ViewController) {
      this.data = localStorage.getItem("additionalInfoText");
    }

  close(text) {
    text = "";
    this.data = "";
    localStorage.setItem("additionalInfoText", "");
    this.viewCtrl.dismiss();
  }

  done(text)
  {
    /*Todo save the text of edittext*/
    this.viewCtrl.dismiss(text);
  }
}