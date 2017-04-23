import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { JwtHelper } from 'angular2-jwt';
@Injectable()
export /**
 * OrdersHistoryService
 */
class OrdersHistoryService {
    headers: Headers;
    options: RequestOptions;

    constructor(private http: Http, 
    private storage: Storage,
    private jwtHelper: JwtHelper) {
        this.headers = new Headers({
                    'x-access-token': this.storage.get('authToken')
            });
            this.options = new RequestOptions({
                    headers: this.headers
            });
    }
   
    getOrdersHistory = (URL, token) =>{
        let xAccessToken: any;
        // console.log(token);
        let headers = new Headers({'x-access-token': token});
        let options = new RequestOptions({ headers: headers });
        // console.log(headers);
        
        return this.http.get(URL, options);
        
        // let getOrdersHistoryPromise = new Promise((resolve, reject)=>{
            
        //         .subscribe(res => {
        //             !!res ? 
        //                 resolve(res) : reject({status: 403, message: 'error 403'});
        //         })
        // })
        // return getOrdersHistoryPromise;
        
    }

    hitPreGen = (URL:any, token) => {
        console.log("Hitting: ", URL);
        let headers = new Headers({'x-access-token': token});
        console.log(token);
        
        let options = new RequestOptions({ headers: headers });
        return this.http.get(URL, options)
            // .map(res => JSON.parse(res['_body']).results);
    }


    getStatus(URL){
        return this.http.get(URL);
    }
}