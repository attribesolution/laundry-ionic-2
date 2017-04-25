import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LaundryItemsService } from '../laundryitems/laundryitems.service';
import { KeysPipe } from '../../pipes/ObjectPipe';
@Component({
    templateUrl: 'rates-list.html',
    selector: 'rates-list',
    providers: [LaundryItemsService, KeysPipe]
})
export class RatesListComponent{
    laundryItems: any;
    responseArray : Array<Object> = [];

    constructor(private navCtrl: NavController, private laundryItemsService: LaundryItemsService){
        let token = localStorage.getItem("x-access-token");
        laundryItemsService.getItems(token).subscribe(res=> {
            if(res.status == 200) {
                let response = JSON.parse(res['_body'])
                this.laundryItems = {
                    href: response["href"],
                    data: response["data"]
                }
                this.maplaundryitems(this.laundryItems.data);
                console.log(this.responseArray);
                
            }
        });
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
}