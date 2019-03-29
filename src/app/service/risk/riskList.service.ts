import { Injectable } from "@angular/core";
import { GLOBAL } from '../../global/global_settion';
import { ObjToQuery } from '../ObjToQuery' ;
import { ObjToQueryString } from '../ObjToQueryString' ;
import { HttpClient , HttpParams , HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn : "root"
})
export class RiskListService{
    constructor(
        private http : HttpClient
    ){};

    getList(paras : Object){
        let para = ObjToQuery(paras) ;

        let url = GLOBAL.API.risk.riskList ;
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

    makeLoan(data : Object){
        let url = GLOBAL.API.finance.loan.loan ;

        let header = new HttpHeaders()
            .set("Contype-type" , "application/json") ;

        return this.http.patch(url , data , {
            headers : header
        });
    };
    //收入证明开关
    postIncomeStatus(data : Object){

        let header = new HttpHeaders()
            .set("Content-type" , 'application/json') ;

        let url = GLOBAL.API.risk.workIncome ;

        return this.http.post(url , data , {
            headers : header
        });
    };
    //收入证明开关
    getIncomeStatus(){

        let url = GLOBAL.API.risk.workIncome ;

        return this.http.get(url);
    };

    //活体开关
    postFaceStatus(data : Object){

        let header = new HttpHeaders()
            .set("Content-type" , 'application/json') ;

        let url = GLOBAL.API.risk.compare ;

        return this.http.post(url , data , {
            headers : header
        });
    };
    //活体开关
    getFaceStatus(){

        let url = GLOBAL.API.risk.compare ;

        return this.http.get(url);
    };

};
