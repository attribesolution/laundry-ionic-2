import { Storage } from "@ionic/storage";
import { AuthHttp, 
    JwtHelper, 
    tokenNotExpired,
    AuthConfig
} from "angular2-jwt";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { Http, RequestOptions, Headers } from "@angular/http";

import { globalVars } from "./../app/globalvariables";

@Injectable()
export class AuthService{
    jwtHelper: JwtHelper = new JwtHelper();
    storage: Storage = new Storage();
    constructor(private http: Http, 
                authHttp: AuthHttp,
                storage: Storage){}
    
    refreshToken(){
        let SignInURL = globalVars.PostSignInApi();
        let token: string;
        this.storage.get('userDetails')
            .then(
                details => {
                    token = this.postCall(SignInURL, details)
                }
            )
            if(!!token){
                return token;
            }else{
                return null;
            }
    }

    postCall(SignInURL, userDetails){
        let token: string;
        this.http.post(SignInURL, userDetails)
            .subscribe(
                res => {
                    if(res.status == 200){
                        token = JSON.parse(res['_body'])['token'];
                        
                        let userID = this.jwtHelper.decodeToken(token);
                        
                        this.storage.set('x-access-token', token);
                        localStorage.setItem('x-access-token', token);
                        
                        this.storage.set('user-id', userID)
                        localStorage.setItem('userID', userID._id);
                        
                        console.log(userID._id);
                        // this.user.scheduleRefresh(this.token);
                    }
                }
            );
        if(!!token){
            return token;
        }else{
            return null;
        }
    }

    getCall(URL){
        let options = this.RequestOptionsMaker();
        return this.http.get(URL, options);
    }

    patchCall(URL, body){
        let options = this.RequestOptionsMaker();
        return this.http.patch(URL, body, options)
    }

    putCall(URL, body){
        let options = this.RequestOptionsMaker();
        return this.http.put(URL, body, options)
    }

    RequestOptionsMaker(){
        let token = localStorage.getItem('x-access-token');
        let header = new Headers();
        
        console.log(this.jwtHelper.isTokenExpired(token));
        if(this.jwtHelper.isTokenExpired(token)){
            token = this.refreshToken();
        }
        console.log('JWT will expire at', this.jwtHelper.getTokenExpirationDate(token));
        header.append('x-access-token', token);
        let options = new RequestOptions({ 
            headers: header 
        });
        return options;
    }

}