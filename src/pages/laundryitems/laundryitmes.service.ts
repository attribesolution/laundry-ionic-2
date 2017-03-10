import {Injectable} from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { globalVars } from '../../app/globalvariables';
@Injectable()

export class LaundryItemsService{
    constructor(private http: Http){}
    
    
    getItems = () => {
         let URL = globalVars.getLaundryitemsApiURL();
        console.log(URL);
       // let URL = (globalVars.LaundryitemsApiURL());
          return this.http.get(URL);
            // .map(e=> e.formatted_address)
    } 

    patchService = (URL: string, data, options?) => {
            return this.http.patch(URL, data, options);
        }
        
}