import {Injectable} from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
@Injectable()
export class PickupService{
    constructor(private http: Http){}
   
     hitPickupPatch = (URL:string, data: any, options?) => {
        console.log("Hitting: ", URL);
        console.log(data, JSON.stringify(data));
        return this.http.patch(URL, data, options)
            // .map(res => JSON.parse(res['_body']).results);
    }

    
}