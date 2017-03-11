import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CareInstructions } from '../care-instructions/care-instructions';
import { globalVars } from '../../app/globalvariables'
import { ServicesPatcher } from './services.service';
import { PreGenModel } from '../../models/preGen.model';
/*
  Generated class for the Services page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-services',
  templateUrl: 'services.html',
  providers: [ServicesPatcher]
})
export class ServicesPage {

    buttons:any = [[{title:'COLD WASH' , selected:true },{title:'HOT WASH' , selected:false}],[{title:'LOW DRY' , selected:true},{title:'REGULAR DRY' , selected:false}],[{title:'SCENTED' , selected:true},{title:'NO SCENT' , selected:false}],[{title:'SOFTNER' , selected:true},{title:'NO SOFTNER' , selected:false}]];
    data: PreGenModel;

  constructor(public navCtrl: NavController, public navParams: NavParams, public servicesPatcher: ServicesPatcher) {
    this.data = navParams.get('preGenData');
    console.log(this.data);
    
  }
  



  ionViewDidLoad() {
    console.log('ionViewDidLoad ServicesPage');
  }

  imageClicked(item ,firstrow?, firstcol?, lastrow?,lastcol?,indexOfSelectedRow?){
    
   
    item.selected = !item.selected;
    if(firstrow){
    
      let itemArray = this.buttons[0];
        if(firstcol){
           item = itemArray[1];
        }
        else{
          item = itemArray[0];
        }
      
      item.selected = !item.selected;
     
      
    }
    else if(lastrow){

      let itemArray = this.buttons[this.buttons.length - 1];
        if(lastcol){
           item = itemArray[0];
        }
        else{
          item = itemArray[1];
        }
      item.selected = !item.selected;
     
      
    }
    else {
      let itemArray = this.buttons[indexOfSelectedRow] ;
        if(lastcol){
           item = itemArray[0];
        }
        else{
          item = itemArray[1];
        }
      item.selected = !item.selected;
     
      
    }
     console.log( item );
  }

  setClass(index){
    return index ? "services-page-unselected" : "services-page-selected";
  }

  setFontColor(index){
    return index ? "#59bd84": "#000";
  }

  
  startNextScreen(){
      let servicesData: Array<string> = [];
      this.buttons.forEach(button => {
        button.forEach( b => {
          if(b.selected == true){
            servicesData.push(b.title);
          }
        });
      });
      console.log(servicesData);
      
      let URL = globalVars.ServicesApiURL((this.data.data as any)._id);
      let patchData = (URL,servicesData) => {
      this.servicesPatcher.patchService(URL, servicesData)
        .subscribe(res =>{
          if(res.status == 200) {
              let response = JSON.parse(res['_body'])
              let Data = {
                href: response["href"],
                data: response["data"]
              }
              console.log('Respose', Data); 
            }
        });
    }
    
      patchData(URL,servicesData)
      this.navCtrl.push(CareInstructions);
      console.log("Next clicked!");
  }

}
