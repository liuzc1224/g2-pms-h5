import { Injectable } from "@angular/core";
import { GLOBAL } from '../../global/global_settion';
import { ObjToQuery } from '../ObjToQuery' ;
import { ObjToQueryString } from '../ObjToQueryString' ;
import { HttpClient , HttpParams , HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn : "root"
})
export class exceptionOrderList{
    constructor(
        private http : HttpClient 
    ){};
    getLoanList(paras : Object){
        let para = ObjToQuery(paras) ;
        let url = GLOBAL.API.finance.exceptionOrderLoanList ; 
        return this.http.get(url , {
            params : para
        });
    };
    getRepayList(paras : Object){
        let para = ObjToQuery(paras) ;
        let url = GLOBAL.API.finance.exceptionOrderRepayList ; 
        return this.http.get(url , {
            params : para
        });
    };
    excelExportLoan(data : object){
        let param = ObjToQueryString(data);
        let url = GLOBAL.API.finance.excelExportLoan + "?" + param;
        window.location.href = url;
    }
    excelExportRepay(data : object){
        let param = ObjToQueryString(data);
        let url = GLOBAL.API.finance.excelExportRepay  + "?" + param;; 
        window.location.href = url;
    }
}