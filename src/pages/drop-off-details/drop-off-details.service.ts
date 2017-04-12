import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class DropOffService{
    constructor(private http: Http){}
   
     hitDropOffPatch = (URL:string, data: any, token?) => {
        console.log("Hitting: ", URL);
        console.log(data);
        let headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token':  token});
        let options = new RequestOptions({ headers: headers });
        console.log(options);
        return this.http.patch(URL, data, options)
            // .map(res => JSON.parse(res['_body']).results);
    }   
}