import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServicesPage } from '../services/services';
import { LaundryItemsService } from './laundryitmes.service';
import { LaundryItemModel } from '../../models/laundryitem.model';
import { globalVars } from '../../app/globalvariables';
import {PreGenModel} from '../../models/preGen.model';
@Component ({
    selector: 'laundry_items',
    templateUrl: 'laundryitems.html',
    providers:[LaundryItemsService] 
})

export class LaundryItems implements OnInit{
  selectedItem: any;
  icons: string[];
  titles: string[];
  laundryitems : LaundryItemModel;
  responseArray : Array<Object> = [];
  data: PreGenModel;
  params : Array<Object> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,private items_Service: LaundryItemsService) {
    this.selectedItem = navParams.get('item');
    this.data = navParams.get('preGenData');
    // this.loc = navParams.get('pickupDetails');
}


  ngOnInit(){

    this.selectedItem = this.navParams.get('item');
    var response$      =  this.items_Service.getItems()
    .subscribe(res => {
      if(res.status == 200) {
        let response = JSON.parse(res['_body']) 
          this.laundryitems = {
            href : response["href"],
            data : response["data"]
          }
           this.maplaundryitems(this.laundryitems.data);
          console.log('final laundry items: ', this.laundryitems)
        }
    })
    console.log("laundryitems",this.laundryitems);
  }

maplaundryitems(data){

  
  data.forEach(element => {
    
   let mappedObject =  {
    object_id: element.object_id, 
    name: element.name,
    icon: element.icon,
    rate: element.rate,
    count: 0,
    amount:0,
    toWash:true,
	  toDry:false
    }
    this.responseArray.push(mappedObject);
  });

}
// increment product qty
  incrementQty(item,index) {
    item.count++;

     this.calculateTotalAmount(item);

    console.log("totalQuantity = ",item.count , "totalAmount = ",item.amount);
     
     if(this.params.indexOf(item) <= -1){
        this.params.push(item);
        console.log("params", this.params);
     }
      

  }

  // decrement product qty
  decrementQty(item,index) {
    if(item.count < 1 ){
      console.log("wash = " , item.rate.wash ,"totalQuantity = ",item.count , "totalAmount = ",item.amount);
      item.count = 0
      item.amount   = 0

      if(this.params.indexOf(item) > -1)
      this.params.splice(this.params.indexOf(item),1);

    }else{
      item.count--;
      
      this.calculateTotalAmount(item);
   
    }

    console.log("totalAmount after = ",item.amount);
  }

addWashingAmountToTotal(item) : number{

   return item.rate.wash *item.count  ;
}
addDryCleaningAmountToTotal(item) :number{

  return item.rate.dryclean *item.count  ;
}
calculateTotalAmount(item){

 
  if(item.toWash && item.toDry)
      item.amount =   this.addWashingAmountToTotal(item) +  this.addDryCleaningAmountToTotal(item);
  else if(item.toDry)
       item.amount =  this.addDryCleaningAmountToTotal(item);
  else
      item.amount =   this.addWashingAmountToTotal(item) ;

}
  wash(item)
  {
     item.toWash = !item.toWash;
     this.calculateTotalAmount(item);
     console.log('wash'+item.toWash);
  }
  dry(item)
  {
    
     item.toDry = !item.toDry;
     this.calculateTotalAmount(item);
     console.log('dry'+item.toDry);
  }

 startNextScreen()
  {
    let jsonArray : Array<Object> = []
    this.params.forEach(element => {
      
        jsonArray.push({
              name: (element as any).name,
	            rate:(element as any).amount,
	            count: (element as any).count,
	            toWash:(element as any).toWash,
	            toDry:(element as any).toDry

        })
    });
    let laundryData: {laundryItems : Array<Object>} = {
      
      laundryItems : jsonArray
    };

    console.log("laundry data = ",laundryData);
    
     let URL =  globalVars.patchLaundryitemsApiURL((this.data.data as any)._id  as string);
     console.log(URL)
    this.items_Service.patchService(URL,laundryData)
    .subscribe(res => {
          if(res.status == 200) {
            let response = JSON.parse(res['_body']) 
              
              console.log('final response = ', response)
            }
        })

      this.navCtrl.push(ServicesPage, {
        preGenData: this.data
      });
      console.log("Next clicked!");
  }
}