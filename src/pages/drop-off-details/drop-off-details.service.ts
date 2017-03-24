    import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class DropOffService{
    constructor(private http: Http){}
   
     hitDropOffPatch = (URL:string, data: any, options?) => {
        console.log("Hitting: ", URL);
        console.log(data);
        return this.http.patch(URL, data, options)
            // .map(res => JSON.parse(res['_body']).results);
    }   
}