import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';

import { UserService } from '../../service/order';

import { CommonMsgService } from '../../service/msg'
import { Response } from '../model';
import { TableData } from '../../share/table/table.model';
import { unixTime } from '../../format';

declare var $ : any ;
@Component({
    selector: "auth",
    templateUrl: "./auth.component.html",
    styleUrls: ["./auth.component.less"]
})
export class AuthComponent {
    constructor(
        private translateSer: TranslateService,
        private usrSer: UserService,
        private msg: CommonMsgService
    ) { };

    userId: number;
    orderId: number;
    tableData: TableData;

    languagePack: Object;

    ngOnInit() {
        this.getLanguage();
        this.getFaceInfo() ;
        this.getCirculoInfo() ;
        this.getFamilyData() ;
    }

    getLanguage() {
        this.translateSer.stream(["financeModule.list", 'common', 'riskModule', 'orderList.allList.table'])
            .subscribe(
                data => {
                    this.languagePack = {
                        common: data['common'],
                        data: data['financeModule.list'],
                        risk: data['riskModule'],
                        orderList: data['orderList.allList.table']
                    };

                    this.initialTable();
                }
            )
    };

    getData(userId: number, orderId? : number) {
        this.userId = userId;
        this.orderId = orderId;
        this.getAuth();
    };

    photoInfo: Object;

    rfc : string ;
    getAuth() {
        this.usrSer.getOrderAuth(this.userId,this.orderId)
            .subscribe(
                (res: Response) => {
                    this.photoInfo = res.data;
                    this.rfc = res.data['rfc'] ;
                }
            )
    };
    //征信借贷明细
    cuentaVOList: Array<object> = [];
    //征信地址记录
    domicilioVOList: Array<object> = [];
    //征信访问信息
    consultasEfectuadaVOList: Array<object> = [];
    //得分描述
    ScoreVO: Array<object> = [];

    //CuentaVO
    cuentaVOInfo: Object;

    //获取征信详情
    getCirculoInfo() {
        this.usrSer.getOrderBaseInfo(this.userId,this.orderId)
            .pipe(
                filter(
                    ( res : Response ) => {
                        if(res.success === false){
                            this.msg.fetchFail((res.message)) ;
                        };

                        return res.success === true && res.data != null;
                    }
                )
            )
            .subscribe(
                (res: Response) => {
                    this.cuentaVOList = res.data['cuentaVOList'];
                    this.domicilioVOList = res.data['domicilioVOList'];
                    this.consultasEfectuadaVOList = res.data['consultasEfectuadaVOList'];
                    this.ScoreVO = res.data['scoreVOList'];

                    console.log(this.domicilioVOList);
                }
            )
    };


    //获取历史订单
    getOrderHisList() {
        this.usrSer.getOrderHisList(this.userId)
            .subscribe(
                ( res : Response ) => {
                    if (res.success) {
                        this.tableData.data = (<Array<Object>>res.data);
                    }else{
                        this.msg.fetchFail(res.message);
                    }
                }
            )
    }

    initialTable() {
        let __this = this;
        this.tableData = {
            tableTitle: [
                {
                    name: __this.languagePack['data']['table']['orderNo'],
                    reflect: "orderNo",
                    type: "text"
                }, {
                    name: __this.languagePack['data']['table']['createTime'],
                    reflect: "createTime",
                    type: "text",
                    filter: (item) => {
                        return unixTime(item.createTime, 'y-m-d h:i:s');
                    }
                },{
                    name: `${__this.languagePack['data']['table']['loanMount']}(${__this.languagePack['data']['table']['moneyUnit']})`,
                    reflect: "auditMoney",
                    type: "text",
                }, {
                    name: __this.languagePack['data']['table']['limit'],
                    reflect: "loanDays",
                    type: "text",
                }, {
                    name: __this.languagePack['orderList']['currentRealRepay'],
                    reflect: "currentRealRepay",
                    type: "text",
                }, {
                    name: __this.languagePack['orderList']['realRepayMoney'],
                    reflect: "realRepayMoney",
                    type: "text",
                }, {
                    name: __this.languagePack['orderList']['dueDay'],
                    reflect: "dueDays",
                    type: "text",
                },{
                    name: __this.languagePack['data']['table']['orderStatus'],
                    reflect: "status",
                    type: "mark",
                    markColor: { "1": "#ec971f", "2": "#108ee9", "9": "#d9534f", "12": "#d9534f" },
                    filter: (item) => {
                        const status = item['status'];

                        const map = __this.languagePack['risk']['searchTabStatus1'];

                        let name = [];

                        map.map(
                            (ele ,index) => {
                                ele.value.forEach(element => {
                                    if (element == status) {
                                        name.push(ele);
                                        return false;
                                    }
                                });
                            }
                        )
                        return (name && name[0].name) ? name[0].name : "no";
                    }
                }, {
                    name: __this.languagePack['data']['table']['comment'],
                    reflect: "comment",
                    type: "text",
                }
            ],
            loading: false,
            showIndex: true,
        };
        this.getOrderHisList()
    };
    faceDate: Object ;
    getFaceInfo(){
        this.usrSer.getFaceInfo(this.userId)
            .subscribe(
                ( res : Response ) => {
                    if (res.success) {
                        this.faceDate = res.data;
                        console.log(this.faceDate);
                    }else{
                        this.msg.fetchFail(res.message);
                    }
                }
            )
    }

    familyInfo : Object ;

    getFamilyData(){
        this.usrSer.getOrderFamilyInfo(this.userId,this.orderId)
            .pipe(
                filter(
                    ( res : Response ) => {

                        if(res.success === false){
                            this.msg.fetchFail(res.message) ;
                        };

                        return res.success === true && res.data != null;
                    }
                )
            )
            .subscribe(
                (res : Response ) => {
                    this.familyInfo = res.data ;
                }
            )
    };


};