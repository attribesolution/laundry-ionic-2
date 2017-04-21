import { Injectable } from '@angular/core';
import { Http, 
         RequestOptions, 
         Headers 
        } from '@angular/http';        

@Injectable()
export class ProfileService{
    constructor(private http: Http){}

    getProfile(URL: string, token: string){
        let headers = new Headers({ 'x-access-token': token});
        let options = new RequestOptions({ headers: headers});
        return this.http.get(URL, options)
    }

    putProfile(URL: string, body: any, token: string){
        let headers = new Headers({ 'x-access-token': token});
        let options = new RequestOptions({ headers: headers});
        return this.http.put(URL, body, options);
    }
}