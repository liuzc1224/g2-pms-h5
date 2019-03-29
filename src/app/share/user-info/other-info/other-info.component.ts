import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../../service/order';
import { MsgService } from '../../../service/msg';
import { Response } from '../../model';
import { filter } from 'rxjs/operators' ;

declare var $ : any ;

@Component({
    selector : "user-other-info" ,
    templateUrl : './other-info.component.html' ,
    styleUrls : ['./other-info.component.less']
})
export class UserOtherInfoComponent implements OnInit {
    constructor(
        private userSer: UserService,
        private msg: MsgService,
    ) {};

    ngOnInit(){
        this.init();


    };

    @Input() usrId : any ;

    @Input() orderId : any ;

    @Input() rfc : any ;

    @Input() faceDate : object;

    @Input() photoInfo : object;

    init(){
        this.getData() ;
        this.getAuthentication() ;
    };

    getData(){
        this.userSer.getOrderBaseInfo(this.usrId,this.orderId)
            .pipe(
                filter(
                    ( res : Response ) => {
                        if(res.success === false){
                            this.msg.error(res.message) ;
                        };

                        return res.success === true && res.data != null;
                    }
                )
            )
            .subscribe(
                (res : Response ) => {
                    this.basicInfo = res.data ;
                }
            )
    };
    basicInfo : Object ;
    authenticatio: Object ;
    //获取认证信息
    getAuthentication(){
        this.userSer.getAuthentication(this.usrId,this.orderId)
            .pipe(
                filter(
                    ( res : Response ) => {
                        if(res.success === false){
                            this.msg.error(res.message) ;
                        };

                        return res.success === true && res.data != null;
                    }
                )
            )
            .subscribe(
                (res : Response ) => {
                    this.authenticatio = res.data ;
                }
            )
    };
    showImg(index){
        $("[data-magnify=gallery]")[index].click();
    }
}