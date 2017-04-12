import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ForgotPasswordService{
    constructor(private http: Http){}

    hitForgotPasswordAPI = (URL,options?) => {
        return this.http.get(URL, options);
    }
}