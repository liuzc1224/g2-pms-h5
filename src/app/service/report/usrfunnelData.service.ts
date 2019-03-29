import { Injectable } from "@angular/core";
import { GLOBAL } from '../../global/global_settion';
import { ObjToQuery } from '../ObjToQuery' ;
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn : "root"
})
export class usrfunnelDataService{
    constructor(
        private http : HttpClient
    ){};

    getData(paras? : Object){
        let para = ObjToQuery(paras) ;
        let url = GLOBAL.API.reportCenter.transformList ;
        return this.http.get(url, {
            params : para
        });
    };
};
