import {Injectable} from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { Storage } from '@ionic/storage';

import { globalVars } from '../../app/globalvariables';

@Injectable()

export class LaundryItemsService{
    

    constructor(private http: Http, private storage: Storage){
        
    }
    
    getItems = (token) => {
        let headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token':  token});
        let options = new RequestOptions({ headers: headers });
         let URL = globalVars.getLaundryitemsApiURL();
        console.log(URL);
       // let URL = (globalVars.LaundryitemsApiURL());
          return this.http.get(URL, options);
            // .map(e=> e.formatted_address)
    } 

    patchService = (URL: string, data, options?) => {
            return this.http.patch(URL, data, options);
        }
        
}