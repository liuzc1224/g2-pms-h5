import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../../service/order';
import { MsgService } from '../../../service/msg';
import { Response } from '../../model';
import { filter } from 'rxjs/operators' ;
import { OrderService } from '../../../service/order';

@Component({
    selector : "user-order-info" ,
    templateUrl : './order-info.component.html' ,
    styleUrls : ['./order-info.component.less']
})
export class UserOrderInfoComponent implements OnInit {
    constructor(
        private userSer: UserService,
        private msg: MsgService,
        private ordSer: OrderService
    ) {};

    ngOnInit(){
        this.init();
    };

    @Input() usrId : any ;

    @Input() orderId : any ;

    init(){
        this.getData() ;
    };

    getData(){
        this.ordSer.orderDetail(this.orderId)
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
                    console.log(res);
                    this.orderInfo = res.data ;
                }
            )
    };
    orderInfo : Object;
}