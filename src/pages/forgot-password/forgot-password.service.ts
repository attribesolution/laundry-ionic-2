import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ForgotPasswordService{
    constructor(private http: Http){}

    hitForgotPasswordAPI = (URL,body,options?) => {
        console.log("forgot password api body = ",body);
        return this.http.post(URL,body, options);
    }
}