import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
@Injectable()
export class NotificationsService{
    constructor(private http: Http){}

    putNotificationsSettings(URL, data, options?){
        console.log(URL);
        
        return this.http.put(URL, data, options)
    }

    getNotificationSettings(URL, options?){
        console.log(URL);

        return this.http.get(URL, options);
    }
}