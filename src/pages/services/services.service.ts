import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class ServicesPatcher{
    constructor(private http: Http){}
        patchService = (URL: string, data, token?) => {
            console.log(data);
            let headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token':  token});
            let options = new RequestOptions({ headers: headers });
        
            return this.http.patch(URL, data, options);
        }
}