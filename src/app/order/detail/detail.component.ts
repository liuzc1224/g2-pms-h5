import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ParaModel } from './paraModel';
import { Adaptor } from '../../share/tool';
import { TableData } from '../../share/table/table.model';
import { dataFormat } from '../../format';
import { CommonMsgService } from '../../service/msg/commonMsg.service';
import { Response } from '../../share/model/reponse.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute } from '@angular/router';
import { BasicInfoComponent } from '../../share/basic-info/basicInfo.component';
import { ApproveComponent } from '../../share/approve/approve.component';
import { AuthComponent } from '../../share/auth/auth.component'
import { RecordComponent } from '../../record/record/record.component';
import { OrderService, UserService } from '../../service/order';
import { filter } from 'rxjs/operators'
import { SessionStorageService } from '../../service/storage';
import { Router } from '@angular/router';
let __this;
@Component({
    selector: "",
    templateUrl: "./detail.component.html",
    styleUrls: ['./detail.component.less']
})
export class DetailComponent implements OnInit {

    constructor(
        private translateSer: TranslateService,
        private msg: CommonMsgService,
        private fb: FormBuilder,
        private routerInfo: ActivatedRoute,
        private orderSer: OrderService,
        private sgo: SessionStorageService,
        private usrSer: UserService,
        private router: Router
    ) { };

    @ViewChild("basicInfo")
    basicInfoComponent: BasicInfoComponent;

    @ViewChild("approve")
    approveComponent: ApproveComponent;

    @ViewChild("auth")
    authComponent: AuthComponent;

    @ViewChild("record")
    recordComponent: RecordComponent;

    @ViewChild("recordAsk")
    recordAskComponent: RecordComponent;

    ngOnInit() {
        __this = this;
        this.getLanguage();

        this.orderInfo = this.sgo.get("orderInfo");

        this.routerInfo.queryParams
            .subscribe(
                (para) => {
                    this.para = para;

                    this.basicInfoComponent.getData(para.usrId);

                    this.approveComponent.getData(para.usrId);

                    this.recordComponent.getData(para.usrId);

                    if (para.from == 'riskList') {
                        this.initRiskForm();
                    };

                }
            );

        let menuInfo = this.sgo.get("menuInfo")['children']

        menuInfo.forEach( (item , idx) => {
            if(item['menuDescriptions'][0]['description'] === '撤回按钮'){
                this.permission = true ;
            }
        });
    };
    para: ParaModel = new ParaModel();

    private languagePack: Object;

    orderInfo: Object;

    permission : boolean = false ;
    getLanguage() {
        this.translateSer.stream(['common', 'orderList'])
            .subscribe(
                data => {
                    this.languagePack = {
                        common: data['common'],
                        order: data['orderList']
                    };

                    this.risk_enum = this.languagePack['order']['allList']['enum']['risk'];
                }
            );
    };

    private selectTab_strategy = {
        "1": () => {
            const usrid = this.para.usrId;
            this.recordComponent.getData(usrid);
        },
        "2": () => {
            const usrid = this.para.usrId;

            this.recordAskComponent.getData(usrid);
        },
        "3": () => {
            const userId = this.para.usrId;

            // this.authComponent.getData(userId);
        },
        "4": () => {
            const userId = this.para.usrId;

            this.orderSer.duration(21)
                .pipe(
                    filter((res: Response) => {
                        if (res.success === false) {
                            this.msg.fetchFail(res.message);
                        };

                        return res.success === true;
                    })
                )
                .subscribe(
                    (res: Response) => {
                        this.actData = (<Array<number>>res.data);
                    }
                )
        },
        "5": () => {
            const usrid = this.para.usrId;

            this.getBankInfo(usrid);

        },
        "6": () => {
            const orderId = this.para.order;

            this.getRiskRecord(orderId);
        },
        "7": () => {
            const orderId = this.para.order;


            this.getPaymentRecord(orderId);
        },
        "8": () => {
            const orderId = this.para.order;

            this.getLoanRecord(orderId);
        },
        "9": () => {
            const orderId = this.para.order;

            this.getRepaymentRecord(orderId);
        },
        "10": () => {
            const orderId = this.para.order;

            this.getRepaymentRecords(orderId);
        }
    };
    selectTab(type) {
        if (this.selectTab_strategy[type] instanceof Function)
            this.selectTab_strategy[type].call(this);
    };

    showModal(modal: string , back : boolean = true) {
        if (modal == 'risk')
            this.showRiskModel(back);
    }
    // risk
    riskMark: boolean = false;

    riskForm: FormGroup;

    risk_enum: Array<{ name: string, value: string }>;

    actData: Array<number>;

    initRiskForm() {
        this.riskForm = this.fb.group({
            auditAmount: [null],
            comment: [null],
            oldStatus: [null],
            orderId: [null],
            status: [null],
            userId: [null],
            applyMoney: [null]
        });
    };
    showRiskModel( back : boolean ) {

        this.riskForm.reset();

        this.riskMark = true;

        let obj = {};
        obj['oldStatus'] = this.para.status;
        obj['orderId'] = this.para.order;
        obj['userId'] = this.para.usrId;
        obj['applyMoney'] = this.para.applyMoney;
        if(back){
            obj['status'] = "1" ;
        };
        this.riskForm.patchValue(obj);

    };

    makeOrderCheck($event) {
        let postData = this.riskForm.value;


        if(postData.status == 1){
            this.orderSer.rebackOrder(postData)
                .pipe(
                    filter(
                        (res : Response) => {
                            if(res.success === false){
                                this.msg.operateFail(res.message) ;
                            };

                            return res.success === true ;
                        }
                    )
                )
                .subscribe(
                    (res : Response) => {
                        this.riskMark = false;
                        // this.router.navigate(['/order/list']);
                    }
                )
        }else{
            if (!postData.auditAmount && postData.status == "2") {
                this.msg.operateFail("请输入审批金额");
                return;
            };

            if (postData.auditAmount > this.orderInfo['applyMoney']) {

                this.msg.operateFail("审批金额不可大于申请金额");

                return;
            };


            let el = <HTMLButtonElement>$event.target;

            el.disabled = true;

            this.orderSer.riskOper(postData)
                .pipe(
                    filter((res: Response) => {

                        if (res.success === false) {
                            this.msg.operateFail(res.message);

                            el.disabled = false;
                        };

                        return res.success === true;
                    })
                )
                .subscribe(
                    (res: Response) => {
                        this.riskMark = false;
                        // this.router.navigate(['/order/list']);
                    }
                );
        };

    };
    //

    //bankInfo
    bankInfo: Array<Object>;
    getBankInfo(usrId: number) {
        this.usrSer.getBankInfo(usrId)
            .pipe(
                filter((res: Response) => {

                    if (res.success === false) {
                        this.msg.fetchFail(res.message);
                    };

                    return res.success === true;
                })
            )
            .subscribe(
                (res: Response) => {
                    this.bankInfo = (<Array<Object>>res.data);
                }
            );
    };

    // riskRecord
    riskRecordInfo: Array<Object>;
    getRiskRecord(orderId: number) {
        this.orderSer.getRiskRecord({
            orderId: orderId
        })
            .pipe(
                filter((res: Response) => {
                    if (res.success === false) {
                        this.msg.operateFail(res.message);
                    };
                    return res.success === true;
                })
            )
            .subscribe(
                (res: Response) => {
                    this.bankInfo = (<Array<object>>res.data);
                }
            );
    };

    // paymentRecord
    paymentRecordInfo: Array<Object>;
    getPaymentRecord(orderId: number) {
        const query = {
            orderIds: orderId
        };

        this.orderSer.getPaymentRecord(query)
            .pipe(
                filter((res: Response) => {
                    if (res.success === false) {
                        this.msg.fetchFail(res.message);
                    };
                    return res.success === true;
                })
            )
            .subscribe(
                (res: Response) => {
                    this.paymentRecordInfo = (<Array<object>>res.data);
                }
            )
    };

    // getLoanRecord
    LoanRecordInfo: Array<Object>;
    getLoanRecord(orderId) {
        const query = {
            orderIds: orderId
        };

        this.orderSer.getLoanRecord(query)
            .pipe(
                filter((res: Response) => {
                    if (res.success === false) {
                        this.msg.fetchFail(res.message)
                    };

                    return res.success === true;
                })
            )
            .subscribe(
                (res: Response) => {
                    this.LoanRecordInfo = (<Array<object>>res.data);
                }
            );
    };

    //repaymentRecord
    repaymentRecord: Array<Object>;
    getRepaymentRecord(orderId: number) {
        const query = {
            orderIds: orderId
        };

        this.orderSer.getRepaymentRecord(query)
            .pipe(
                filter((res: Response) => {

                    if (res.success === false) {
                        this.msg.fetchFail(res.message);
                    };
                    return res.success === true;
                })
            )
            .subscribe(
                (res: Response) => {
                    this.repaymentRecord = (<Array<object>>res.data);
                }
            )
    };

    // repaymentRecords
    repaymentRecords: Array<Object>;
    getRepaymentRecords(orderId: number) {
        const query = {
            orderId: orderId
        };
        this.orderSer.getRepaymentRecords(query)
            .pipe(
                filter((res: Response) => {

                    if (res.success === false) {
                        this.msg.fetchFail(res.message);
                    };
                    return res.success === true;
                })
            )
            .subscribe(
                (res: Response) => {
                    this.repaymentRecords = (<Array<object>>res.data);
                }
            );
    }
};