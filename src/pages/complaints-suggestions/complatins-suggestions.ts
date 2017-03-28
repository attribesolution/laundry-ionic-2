import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ComplaintsSuggestionsService{
    constructor(private http: Http){}
   
     hitCareInstructionsPatch = (URL:string, data: any, options?) => {
        console.log("Hitting: ", URL);
        console.log(data, JSON.stringify(data));
        return this.http.patch(URL, data, options)
            // .map(res => JSON.parse(res['_body']).results);
    }   
}