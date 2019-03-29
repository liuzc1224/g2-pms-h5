import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../../service/order';
import { MsgService } from '../../../service/msg';
import { Response } from '../../model';
import { filter } from 'rxjs/operators' ;

@Component({
    selector : "user-info-basic" ,
    templateUrl : './basic-info.component.html' ,
    styleUrls : ['./basic-info.component.less']
})
export class UserInfoBasicComponent implements OnInit {
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

    init(){
        this.getData() ;
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
                    this.zxOnerInfo = res.data ;
                }
            )
    };
    zxOnerInfo : Object;
}