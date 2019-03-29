import { Component, Input } from '@angular/core';
import { RecordService } from '../../service/order';

import { CommonMsgService } from '../../service/msg/commonMsg.service';
import { Response } from '../../share/model/reponse.model';
import { SearchModel } from './searchModel';
import { Router } from '@angular/router' ;
import { orderStatustransform } from '../../format';

let __this;
@Component({
    selector: "record",
    templateUrl: "./record.component.html",
    styleUrls: ['./record.component.less']
})
export class RecordComponent {

    @Input() type: string;
    constructor(
        private msg: CommonMsgService,
        private recordSer: RecordService,
        private router: Router
    ) { };

    userId: number;
    orderList;
    askList;
    SearchModel: SearchModel = new SearchModel;

    getData(userId: number) {
        this.userId = userId;
        this.SearchModel.userId = userId;
        this.getOrderList();
    };

    getAskData(userId: number) {
        this.userId = userId;
        this.SearchModel.userId = userId;
        this.getAskList();
    }

    goDetail(item : object) {
        console.log(item);
        this.router.navigate(['/order/detail'] , {
            queryParams : {
                from : "user",
                order : item['id'] ,
                usrId : item['userId'] ,
                loanStatus : orderStatustransform(item['status'])
            }
        });
    }

    orderDtail: Object;

    getBasicInfo(orderId: number) {
        this.recordSer.getBasicInfo(orderId)
            .subscribe(
                (res: Response) => {
                    this.orderDtail = res.data;

                    console.log(res.data);
                }
            )
    };

    getOrderList() {
        let data = this.SearchModel;
        this.recordSer.getOrderListInfo(data)
            .subscribe(
                (res: Response) => {
                    this.orderList = res.data;
                }
            )
    }

    getAskList() {
        let data = this.SearchModel;
        this.recordSer.getOrderListInfo(data)
            .subscribe(
                (res: Response) => {
                    this.askList = res.data;
                }
            )
    }


};