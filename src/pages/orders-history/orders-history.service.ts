import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { JwtHelper } from 'angular2-jwt';
@Injectable()
export /**
 * OrdersHistoryService
 */
class OrdersHistoryService {
    constructor(private http: Http, 
    private storage: Storage,
    private jwtHelper: JwtHelper) {
        
    }
    getOrdersHistory = (URL, token) =>{
        let xAccessToken: any;
        console.log(token);
        let headers = new Headers({'x-access-token': token});
        let options = new RequestOptions({ headers: headers });
        console.log(headers);
        
        console.log(this.jwtHelper.getTokenExpirationDate(token), 'isTokenExpired:', this.jwtHelper.isTokenExpired(token));
        return this.http.get(URL, options);
        
        // let getOrdersHistoryPromise = new Promise((resolve, reject)=>{
            
        //         .subscribe(res => {
        //             !!res ? 
        //                 resolve(res) : reject({status: 403, message: 'error 403'});
        //         })
        // })
        // return getOrdersHistoryPromise;
        
    }
}