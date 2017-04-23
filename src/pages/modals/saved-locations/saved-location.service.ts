import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

@Injectable()
export class SavedLocationService{
    constructor(private http: Http){
    }

    getAddressOfSavedLocations(URL, token){
        let headers = new Headers({'x-access-token': token});
        let options = new RequestOptions({ headers: headers });
        return this.http.get(URL, options);
    }
}