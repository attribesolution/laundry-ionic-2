import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
@Injectable()
export class SignInService{
    constructor(private http: Http){}

    signInUser = (URL, body): any => {
        return this.http.post(URL, body)
    }
}