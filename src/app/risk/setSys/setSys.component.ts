import { Component, OnInit } from '@angular/core';

import { CommonMsgService } from '../../service/msg/commonMsg.service';
import { Response } from '../../share/model/reponse.model';
import { RiskListService } from '../../service/risk';

@Component({
    selector: "",
    templateUrl: "./setSys.component.html",
    styleUrls: ['./setSys.component.less']
})
export class setSysComponent implements OnInit {

    constructor(
        private msg: CommonMsgService,
        private riskListService: RiskListService,
    ) { };

    ngOnInit() {
        this.getIncomeStatus();
        this.getFaceStatus();
    };

    incomeStatus: boolean = false;
    faceCompareButtonStatus: boolean = false;

    loading: boolean = false;
    faceLoading: boolean = false;

    //控制收入证明开关
    incomeStatusChange(): void {
        if (!this.loading) {
            this.loading = true;
            this.postIncomeStatus(!this.incomeStatus);
        }
    }
    //控制活体开关
    faceStatusChange(): void {
        if (!this.faceLoading) {
            this.faceLoading = true;
            this.postFaceStatus(!this.faceCompareButtonStatus);
        }
    }
    //改变收入证明是否必填
    postIncomeStatus(bool: boolean): void {
        let parm = {};
        parm['incomeStatus'] = bool;
        this.riskListService.postIncomeStatus(parm)
            .subscribe(
                (res: Response) => {
                    if (res.success) {
                        this.incomeStatus = !this.incomeStatus;
                        this.loading = false;
                    } else {
                        this.msg.fetchFail(res.message);
                    }
                }
            )
    }
    //改变活体是否开启
    postFaceStatus(bool: boolean): void {
        let parm = {};
        parm['faceCompareButton'] = bool;
        this.riskListService.postFaceStatus(parm)
            .subscribe(
                (res: Response) => {
                    if (res.success) {
                        this.faceCompareButtonStatus = !this.faceCompareButtonStatus;
                        this.faceLoading = false;
                    } else {
                        this.msg.fetchFail(res.message);
                    }
                }
            )
    }
    //获取收入证明开关状态
    getIncomeStatus(){
        this.riskListService.getIncomeStatus()
            .subscribe(
                (res: Response) => {
                    if (res.success) {
                        this.incomeStatus = res.data['incomeStatus'];
                        this.loading = false;
                    } else {
                        this.msg.fetchFail(res.message);
                    }
                }
            )
    }
    //获取活体开关状态
    getFaceStatus(){
        this.riskListService.getFaceStatus()
            .subscribe(
                (res: Response) => {
                    if (res.success) {
                        this.faceCompareButtonStatus = res.data['faceCompareButton'];
                        this.faceLoading = false;
                    } else {
                        this.msg.fetchFail(res.message);
                    }
                }
            )
    }
};