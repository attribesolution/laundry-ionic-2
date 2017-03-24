import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
@Injectable()
export class SignUpService{
    constructor(private http: Http){}
    PostNewUser = (URL, data, options?) =>{
        return this.http.post(URL, data, options)
            
    }
}