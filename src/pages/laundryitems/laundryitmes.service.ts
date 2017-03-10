import {Injectable} from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { globalVars } from '../../app/globalvariables';
@Injectable()

export class LaundryItemsService{
    constructor(private http: Http){}
    
    
    getItems = () => {
        console.log(globalVars.LaundryitemsApiURL);
        let URL = (globalVars.LaundryitemsApiURL);
          return this.http.get(globalVars.BaseURL + globalVars.LaundryitemsURL);
            // .map(e=> e.formatted_address)
    } 
}