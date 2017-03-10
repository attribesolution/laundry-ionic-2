import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ServicesPage } from '../services/services';
import { LaundryItemsService } from './laundryitmes.service';
import { LaundryItemModel } from '../../models/laundryitem.model';
import { globalVars } from '../../app/globalvariables';
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
  totalAmount : number;
  totalQuantity : number;
  responseArray : Array<Object> = [];
  data: "";
  constructor(public navCtrl: NavController, public navParams: NavParams,private items_Service: LaundryItemsService) {
    this.selectedItem = navParams.get('item');
    this.data = navParams.get('preGenData');
}


  ngOnInit(){
     // default values
    this.totalAmount   = 0;
    this.totalQuantity = 0;
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
    toWash:true,
	  toDry:false

    }
    this.responseArray.push(mappedObject);
  });

}
// increment product qty
  incrementQty(item,index) {
    this.totalQuantity++;

     this.calculateTotalAmount(item);

    console.log("totalQuantity = ",this.totalQuantity , "totalAmount = ",this.totalAmount);
     
  }

  // decrement product qty
  decrementQty(item,index) {
    if(this.totalQuantity < 1 ){
      console.log("wash = " , item.rate.wash ,"totalQuantity = ",this.totalQuantity , "totalAmount = ",this.totalAmount);
      this.totalQuantity = 0
      this.totalAmount   = 0
      
    }else{
      this.totalQuantity--;
      
      this.calculateTotalAmount(item);
   
    }

    console.log("totalAmount after = ",this.totalAmount);
  }

addWashingAmountToTotal(item) : number{

   return item.rate.wash *this.totalQuantity  ;
}
addDryCleaningAmountToTotal(item) :number{

  return item.rate.dryclean *this.totalQuantity  ;
}
calculateTotalAmount(item){

 
  if(item.toWash && item.toDry)
      this.totalAmount =   this.addWashingAmountToTotal(item) +  this.addDryCleaningAmountToTotal(item);
  else if(item.toDry)
       this.totalAmount =  this.addDryCleaningAmountToTotal(item);
  else
      this.totalAmount =   this.addWashingAmountToTotal(item) ;

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
      this.navCtrl.push(ServicesPage, {
        preGenData: this.data
      });
      console.log("Next clicked!");
  }
}