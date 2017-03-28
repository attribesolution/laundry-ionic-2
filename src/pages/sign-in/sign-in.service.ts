import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
@Injectable()
export class SignInService{
    constructor(private http: Http){}

    getUser = (username, password) =>{
        if(username == 'taha' && password == '1234'){
            return {
                signIn: 'SucessFull'
            }
        }
    }
}