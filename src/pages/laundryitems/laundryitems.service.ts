import {Injectable} from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import { Storage } from '@ionic/storage';

import { globalVars } from '../../app/globalvariables';

@Injectable()

export class LaundryItemsService{
    
    headers: Headers;
    options: RequestOptions;

    constructor(private http: Http, private storage: Storage){
        let xAccessToken: any;
        this.storage.get('x-access-token')
                .then(
                        data => {
                                xAccessToken = data['xAccessToken'];
                                console.log('On OrdersHistoryService', xAccessToken);
                                
                        } 
        )       
        let headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token':  xAccessToken});
        let options = new RequestOptions({ headers: headers });
    }
    
    getItems = () => {
         let URL = globalVars.getLaundryitemsApiURL();
        console.log(URL);
       // let URL = (globalVars.LaundryitemsApiURL());
          return this.http.get(URL, this.options);
            // .map(e=> e.formatted_address)
    } 

    patchService = (URL: string, data, options?) => {
            return this.http.patch(URL, data, options);
        }
        
}