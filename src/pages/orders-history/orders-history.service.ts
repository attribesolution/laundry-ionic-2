import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
@Injectable()
export /**
 * OrdersHistoryService
 */
class OrdersHistoryService {
    constructor(private http: Http) {
        
    }
    getOrdersHistory = (URL, options?) =>{
        return this.http.get(URL, options);
               
    }
}