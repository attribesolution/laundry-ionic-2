import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LaundryItemsService } from '../laundryitems/laundryitems.service';
@Component({
    templateUrl: 'rates-list.html',
    selector: 'rates-list',
    providers: [LaundryItemsService]
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
    upperBody = ["Kandura-Summer", "Ghutra",      "Shirt",         "T-Shirt", 
                 "Jacket",         "Safari Suit", "Men's Suit",    "Pakistani Suit", 
                 "Sweater",        "Coat",        "Long Coat",     "Tie",
                 "Cap",            "Under Shirt", "Night Gown",    "Abaya",
                 "Bed Sheet",      "Ladies Suit", "Saree",         "Blouse",
                 "Dress",          "Dress",       "Dress Wedding", "Dress Child",
                 "Shela",          "Apron"];
    LowerBody = ["Jeans", "Trouser", "Under Shorts", "Lungi", 
                 "Pyjama", "Socks", "Short Skirt", "Long Skirt",
                 "Shalwar Kameez", "Uniform", "Dress Child", "Blanket Large",
                 "Blanket Small", "Bed Sheel (L)", "Bed Cover", "Curtains", 
                 "Table Cloth", "Pillow Cover", "Towel Big", "Towel Medium", 
                 "Towel Small", "Carpet"];
    maplaundryitems(data){
        data.forEach(element => {
        let pseudoIcon = this.upperBody.findIndex( obj => obj == element.name) != -1 ? "kc-jacket" : "kc-jeans"
        let mappedObject =  {
            object_id: element.object_id, 
            name: element.name,
            icon: element.icon,
            rate: element.rate,
            count: 0,
            amount:0,
            toWash:true,
            toDry:false,
            pIcon: pseudoIcon
            }
            this.responseArray.push(mappedObject);
        });
    }
}