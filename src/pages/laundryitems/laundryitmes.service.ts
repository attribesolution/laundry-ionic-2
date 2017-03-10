import {Injectable} from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import {BaseURL, LaundryitemsURL} from '../../app/globalvariables';
@Injectable()

export class LaundryItemsService{
    constructor(private http: Http){}
    
    
    getItems = () => {
        console.log(BaseURL + LaundryitemsURL);
          return this.http.get(BaseURL + LaundryitemsURL)
            // .map(e=> e.formatted_address)
    } 
}