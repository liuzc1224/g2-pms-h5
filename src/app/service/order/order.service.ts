import { Injectable, EventEmitter, OnInit } from "@angular/core";
import { GLOBAL } from '../../global/global_settion';
import { ObjToQuery } from '../ObjToQuery';
import { ObjToQueryString } from '../ObjToQueryString';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { LoanPurposeClass } from './loanPurposeModel/loanPurpose.model' ;
@Injectable({
    providedIn: "root"
})
export class OrderService {

    constructor(
        private http: HttpClient
    ) { };


    riskOper(data : Object){
        const url = GLOBAL.API.order.operate.risk.audit ;

        const header = new HttpHeaders()
            .set("Content-type" , "application/json") ;

        return this.http.put(url , data , {
            headers : header
        });
    };

    duration(userId : number){
        const url = GLOBAL.API.order.operate.risk.duration + "/" + userId ;

        return this.http.get(url) ;
    };

    getRiskRecord( data : Object ){
        const url = GLOBAL.API.order.record.risk ;

        const para = ObjToQuery(data) ;

        return this.http.get(url ,{
            params : para
        });
    };

    getPaymentRecord( data : Object ) {
        const url = GLOBAL.API.order.record.payment ;

        const para = ObjToQuery(data) ;

        return this.http.get(url , {
            params: para
        });
    };

    getLoanRecord( data : Object) {
        const url = GLOBAL.API.order.record.loan ;

        const para = ObjToQuery(data) ;

        return this.http.get(url , {
            params : para
        });
    };

    // plan
    getRepaymentRecord( data : Object){
        const url = GLOBAL.API.order.record.repayment ;

        const para = ObjToQuery(data) ;

        return this.http.get(url , {
            params : para
        });
    };

    //record
    getRepaymentRecords( data : Object){
        const url = GLOBAL.API.order.record.repaymentRecord ;

        const para = ObjToQuery(data) ;

        return this.http.get(url , {
            params : para
        });
    };

    rebackOrder(data : Object){
        const url = GLOBAL.API.order.operate.reback ;

        const header = new HttpHeaders()
            .set("Content-type" , 'application/json') ;

        return this.http.put(url , data , {
            headers : header
        })
    };

    orderDetail(orderId : number){
        const url = GLOBAL.API.order.list.detail + "/" + orderId ;

        return this.http.get(url) ;
    };

    getPurposeEnum( locale : string = window.navigator.language ){

        let model = new LoanPurposeClass()

        return model.get(locale) ;
    }
};