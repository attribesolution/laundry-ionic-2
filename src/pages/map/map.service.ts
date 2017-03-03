import {Injectable} from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
@Injectable()

export class MapService{
    constructor(private http: Http){}
    myApiKey = 'AIzaSyClwzFHgEdw9cmOYtKmGcvyTEN3nK4gXiY'
    
    getJSON = (place: string) => {
        let googleLocationApi = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${place}&key=${this.myApiKey}`
        return this.http.get(googleLocationApi).map(res => res.json()).filter(e => e.formatted_address);
    } 

    startNextScreen()
    {
      /*Todo start next screen*/
      console.log("Next clicked!");
    }
}