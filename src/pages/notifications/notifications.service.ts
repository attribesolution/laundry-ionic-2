import { Injectable } from '@angular/core';
import { Http, Headers,RequestOptions } from '@angular/http';
@Injectable()
export class NotificationsService{
    constructor(private http: Http){}


    putNotificationsSettings(URL, data, token?){
       console.log("Request Url",URL);
        let headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token':  token});
        let options = new RequestOptions({ headers: headers });
        return this.http.put(URL, data, options);
    }

    getNotificationSettings(URL, token?){
        console.log("Request Url",URL);
        let headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token':  token});
        let options = new RequestOptions({ headers: headers });
        return this.http.get(URL, options);
    }
}