import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
@Injectable()
export class SavedLocationService{
    constructor(private http: Http){
    }

    getAddressOfSavedLocations(URL, options?){
        return this.http.get(URL, options);
    }
}