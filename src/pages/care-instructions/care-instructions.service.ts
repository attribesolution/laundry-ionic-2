import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class CareInstructionsService{
    constructor(private http: Http){}
   
     hitCareInstructionsPatch = (URL:string, data: any, token?) => {
         
        console.log("Hitting: ", URL);
        console.log(data, JSON.stringify(data));
        let headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token':  token});
        let options = new RequestOptions({ headers: headers });
        
        return this.http.patch(URL, data, options)
            // .map(res => JSON.parse(res['_body']).results);
    }   
}