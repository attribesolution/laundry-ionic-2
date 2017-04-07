import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
@Injectable()
export /**
 * OrdersHistoryService
 */
class OrdersHistoryService {
    constructor(private http: Http, private storage: Storage) {
        
    }
    getOrdersHistory = (URL) =>{
        let xAccessToken: any;
        this.storage.get('x-access-token')
            .then(
               data => {
                   xAccessToken = data['xAccessToken'];
                   console.log('On OrdersHistoryService', xAccessToken);
                   
               } 
            )
        let headers = new Headers({ 'Content-Type': 'application/json', 'x-access-token':  xAccessToken});
        let options = new RequestOptions({ headers: headers });
        return this.http.get(URL, options);
               
    }
}