import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../../service/order';
import { filter } from 'rxjs/operators' ;
import { Response } from '../../model'
import { MsgService } from '../../../service/msg';

declare var $ : any;
@Component({
    selector : "user-income-info" ,
    templateUrl : './income.component.html' ,
    styleUrls : ['./income.component.less']
})

export class IncomeComponent implements OnInit {


    constructor(
        private userSer: UserService,
        private msg: MsgService,
    ) {};

    ngOnInit(){
        this.init()
    };

    @Input() usrId : any ;
    @Input() orderId : any ;

    init(){
        this.getData() ;
    };

    incomeInfo : Object ;

    getData(){
        this.userSer.getOrderWorkInfo(this.usrId,this.orderId)
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
                    this.incomeInfo = res.data ;
                }
            )
    };

    showImg(index){
        $("[data-magnify=gallery]")[index].click();
    }
}