import {Injectable} from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
@Injectable()

export class MapService{
    constructor(private http: Http){}
    myApiKey = 'AIzaSyBifb4pycCZZCs1OqewdQ-d698bylvYjkw'
    
    getJSON = (place: string) => {
        let stringQuery = place +  " in UAE";
        let googleLocationApi = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${stringQuery}&key=${this.myApiKey}`
        console.log(googleLocationApi);
        return this.http.get(googleLocationApi)
            .map(res => JSON.parse(res['_body']).results)
            // .map(e=> e.formatted_address)
    } 

    startNextScreen()
    {
      /*Todo start next screen*/
      console.log("Next clicked!");
    }
}