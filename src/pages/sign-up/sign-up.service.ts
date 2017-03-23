import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
@Injectable()
export class SignUpService{
    constructor(private http: Http){}
    PostNewUser = (URL, data, options?) =>{
        this.http.post(URL, data, options)
            .subscribe(res => {
                if(res.status = 200){
                    console.log(res['_body']);
                }
            });
    }
}