import { Injectable } from "@angular/core";
import { GLOBAL } from '../../global/global_settion';
import { ObjToQuery } from '../ObjToQuery' ;
import { ObjToQueryString } from '../ObjToQueryString' ;
import { HttpClient , HttpParams , HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn : "root"
})
export class LoanListService{
    constructor(
        private http : HttpClient 
    ){};

    getList(paras : Object){

        let para = ObjToQuery(paras) ;

        let url = GLOBAL.API.finance.loanList ; 
        return this.http.get(url , {
            params : para
        });
    };

    postLoan(data : Object){
        let url = GLOBAL.API.finance.loanList; 
    
        let header = new HttpHeaders()
            .set("Content-type" , 'application/json') ;

        return this.http.post(url , data , {
            headers : header
        }); 
    };
    getTableDetail(paras : Object){

        let para = ObjToQuery(paras) ;

        let url = GLOBAL.API.finance.tableDetail; 
        return this.http.get(url , {
            params : para
        });
    };


    makeLoan(data : Object){
        let url = GLOBAL.API.finance.loan.loan ; 

        let header = new HttpHeaders()
            .set("Contype-type" , "application/json") ;

        return this.http.patch(url , data , {
            headers : header
        });
    };
};
