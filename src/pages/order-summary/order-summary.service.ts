import { Injectable } from '@angular/core';
import { Http, 
         Headers, 
         RequestOptions 
        } from '@angular/http';

@Injectable()
export class OrderSummaryService{
    constructor(private http: Http){}

    getOrderByID(URL:string, token: string){
        let headers = new Headers({'x-access-token': token});
        let options = new RequestOptions({ headers: headers });
        return this.http.get(URL, options);
    }
}
