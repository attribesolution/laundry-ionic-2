import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ServicesPatcher{
    constructor(private http: Http){}
        patchService = (URL: string, data, options?) => {
            return this.http.patch(URL, data, options);
        }
}