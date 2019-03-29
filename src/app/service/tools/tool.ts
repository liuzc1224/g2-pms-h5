import {Injectable, EventEmitter, OnInit} from "@angular/core";
import { GLOBAL } from '../../global/global_settion';
import { ObjToQuery } from '../ObjToQuery' ;
import { ObjToQueryString } from '../ObjToQueryString' ;
import { HttpClient , HttpParams , HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn : "root"
})
export class ToolService{

    constructor(
        private http : HttpClient
    ){};

    ipLocate( ip : string ){
        let url = `http://www.ip138.com/ips138.asp?ip=${ip}&action=2` ;
        window.open(url) ;
    };

    location( lat : string , lng : string){
        let url = `http://3gimg.qq.com/lightmap/v1/wxmarker/index.html?marker=coord:${lat},${lng}` ;
        window.open(url) ;
    }
};