import {Injectable} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
@Injectable()
export class PickupService{
    constructor(private http: Http){}
   
     hitPickupPatch = (URL:string, data: any, token?) => {
        console.log("Hitting: ", URL);
        console.log(data, JSON.stringify(data));
        let headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token':  token});
        let options = new RequestOptions({ headers: headers });
        console.log(options);
        
        return this.http.patch(URL, data, options)
            // .map(res => JSON.parse(res['_body']).results);
    }

    
}