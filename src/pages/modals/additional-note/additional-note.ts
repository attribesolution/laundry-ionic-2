import { NavController ,ViewController, PopoverController } from 'ionic-angular';
import {Component} from '@angular/core';

@Component ({
    templateUrl:'additional-note.html'
   
})
export class AdditionalNote
{
    constructor(public viewCtrl: ViewController) {}

  close() {
    this.viewCtrl.dismiss();
  }

  done()
  {
    /*Todo save the text of edittext*/
    this.viewCtrl.dismiss();
  }
}