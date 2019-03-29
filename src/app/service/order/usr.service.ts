import {Injectable, EventEmitter, OnInit} from "@angular/core";
import { GLOBAL } from '../../global/global_settion';
import { ObjToQuery } from '../ObjToQuery' ;
import { ObjToQueryString } from '../ObjToQueryString' ;
import { HttpClient , HttpParams , HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn : "root"
})
export class UserService{

    constructor(
        private http : HttpClient
    ){};

    getBasicInfo( usrId : number ){
        const url = GLOBAL.API.order.user.basicInfo + "/" + usrId ;

        return this.http.get(url);
    };

    getAccountInfo( userId : number){
        const url = GLOBAL.API.order.user.accountInfo + "/" + userId ;

        return this.http.get(url) ;
    };

    getAuth( usrId : number ){
        const url = GLOBAL.API.order.user.auth + "/" + usrId;

        return this.http.get(url) ;
    };

    getOrderAuth( usrId : number, orderId:number ){
        const url = GLOBAL.API.order.user.orderAuth + "/" + usrId;
        let paras = {
            orderId: orderId
        }
        let para = ObjToQuery(paras);
        return this.http.get(url, {
            params: para
        }) ;
    };

    getUserLoginInfo( usrId : number ){
        const url = GLOBAL.API.order.user.userInfo + "/" + usrId;

        return this.http.get(url) ;
    };

    getBaseInfo( usrId : number ){
        const url = GLOBAL.API.order.user.baseInfo + "/" + usrId;

        return this.http.get(url) ;
    };

    getOrderBaseInfo( usrId : number, orderId: number ){
        const url = GLOBAL.API.order.user.orderBaseInfo + "/" + usrId;
        let paras = {
            orderId: orderId
        }
        let para = ObjToQuery(paras);

        return this.http.get(url, {
            params: para
        }) ;
    };

    getAuthentication( usrId : number, orderId: number ){
        const url = GLOBAL.API.order.user.authentication + "/" + usrId;
        let paras = {
            orderId: orderId
        }
        let para = ObjToQuery(paras);

        return this.http.get(url, {
            params: para
        }) ;
    };

    getFamilyInfo( usrId : number ){
        const url = GLOBAL.API.order.user.familyInfo + "/" + usrId;

        return this.http.get(url) ;
    };

    getOrderFamilyInfo( usrId : number, orderId : number ){
        const url = GLOBAL.API.order.user.orderFamilyInfo + "/" + usrId;
        let paras = {
            orderId: orderId
        }
        let para = ObjToQuery(paras);

        return this.http.get(url, {
            params: para
        }) ;
    };

    getWorkInfo( usrId : number ){
        const url = GLOBAL.API.order.user.workInfo + "/" + usrId;

        return this.http.get(url) ;
    };

    getOrderWorkInfo( usrId : number, orderId : number ){
        const url = GLOBAL.API.order.user.workInfo + "/" + usrId;
        let paras = {
            orderId: orderId
        }
        let para = ObjToQuery(paras);

        return this.http.get(url, {
            params: para
        }) ;
    };

    getFriendInfo( usrId : number ){
        const url = GLOBAL.API.order.user.friendInfo + "/" + usrId;

        return this.http.get(url) ;
    };

    getOrderFriendInfo( usrId : number, orderId : number ){
        const url = GLOBAL.API.order.user.orderFriendInfo + "/" + usrId;
        let paras = {
            orderId: orderId
        }
        let para = ObjToQuery(paras);

        return this.http.get(url, {
            params: para
        }) ;
    };

    getBankInfo( userId : number){
        const url = GLOBAL.API.order.user.bankInfo + "/" + userId ;
        return this.http.get(url) ;
    };

    getOrderHisList(userId : number){
        const url = GLOBAL.API.order.user.orderHisList + "/" + userId ;
        return this.http.get(url) ;
    }

    getFaceInfo(userId : number){
        const url = GLOBAL.API.order.user.feceInfo + "/" + userId ;
        return this.http.get(url) ;
    }
};