import { Component , OnInit , ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Adaptor , ObjToArray } from '../../share/tool' ;
import { TableData } from '../../share/table/table.model' ;
import { unixTime } from '../../format';

import { UserListService } from '../../service/user' ;
import { CommonMsgService } from '../../service/msg/commonMsg.service' ;
import { Response } from '../../share/model/reponse.model' ;
import { FormGroup , FormBuilder, Validators } from '@angular/forms'
import { filter } from 'rxjs/operators';
import { Router } from '@angular/router' ;
import { SessionStorageService } from '../../service/storage';
import { DateObjToString } from '../../format';
import { ActivatedRoute } from '@angular/router' ;
import { AuthComponent } from '../../share/auth/auth.component'
import { OrderService, UserService } from '../../service/order';

@Component({
    selector : "usr-auth" ,
    templateUrl : './auth.component.html' ,
    styleUrls : ['./auth.component.less']
})
export class UsrAuthComponent implements OnInit{
    constructor(
        private translateSer: TranslateService,
        private msg: CommonMsgService,
        private fb: FormBuilder,
        private routerInfo: ActivatedRoute ,
        private service : UserListService ,
        private sgo : SessionStorageService ,
        private orderSer : OrderService ,
        private router : Router
    ){}
    ngOnInit(){

        this.getLanguage() ;
        this.orderInfo = this.sgo.get("orderInfo");

        this.routerInfo.queryParams
            .subscribe(
                (para) => {
                    this.para = para;

                    console.log(para) ;
                    this.authComponent.getData(this.para['usrId'],this.para['order']) ;

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

    para : Object ;

    permission : boolean ;

    orderInfo: Object ;

    @ViewChild("auth")
    authComponent: AuthComponent;

    riskForm: FormGroup;

    riskMark : boolean = false ;

    initRiskForm() {
        this.riskForm = this.fb.group({
            auditAmount: [null],
            comment: [null],
            oldStatus: [null],
            orderId: [null],
            status: [null],
            userId: [null],
            applyMoney: [null] ,
            cause : [null]
        });
    };
    showTreat : boolean = false ;
    showRefuse : boolean = false ;

    showModal(modal: string , back : boolean , oper : string) {
        this.showTreat = false ;
        this.showRefuse = false ;
        let status = '' ;

        let msg = this.languagePack['common']['tips']['invalidOper'] ;

        if( (oper == 'pass' || oper == 'refuse' ) && this.para['status'] != 1){
            this.msg.operateFail(msg) ;
            return ;
        };

        if( oper == 'retreat' && this.para['status'] != 2){
            this.msg.operateFail(msg) ;
            return ;
        };

        if(oper == 'pass' && this.para['status'] == 1){
            status = '2'
        };


        if(oper == 'refuse' && this.para['status'] == 1){
            status = '9' ;
            this.showRefuse = true ;
        };


        if(oper == 'retreat' && this.para['status'] != 1){
            status = '9';
            this.showTreat = true ;
        };
        if (modal == 'risk')
            this.showRiskModel(status);
    };

    showRiskModel( back ) {
        this.riskForm.reset();

        this.riskMark = true;

        let obj = {};
        obj['oldStatus'] = this.para['status'];
        obj['orderId'] = this.para['order'];
        obj['userId'] = this.para['usrId'];
        obj['auditAmount'] = this.para['applyMoney'];//审批金额
        obj['applyMoney'] = this.para['applyMoney'];//申请金额
        obj['status'] = back ;
        this.riskForm.patchValue(obj);

    };
    languagePack : Object ;
    risk_enum : any ;
    getLanguage() {
        this.translateSer.stream(['common', 'orderList'])
            .subscribe(
                data => {
                    this.languagePack = {
                        common: data['common'],
                        order: data['orderList']
                    };

                    this.risk_enum = this.languagePack['order']['allList']['enum']['risk'];
                    this.refuse_enum = this.languagePack['order']['allList']['enum']['refuse'];
                    this.retreat_enum = this.languagePack['order']['allList']['enum']['retreat'];

                }
            );
    };
    makeOrderCheck($event) {
        let postData = this.riskForm.value;
        //审批下限
        if (postData['auditAmount'] < 1000) {
            this.msg.operateFail(this.languagePack['common']['tips']['minAuditMoney']);
            return false;
        }
        //审批上限
        if (postData['auditAmount'] > postData['applyMoney']) {
            this.msg.operateFail(this.languagePack['common']['tips']['moneyOverflow']);
            return false;
        }
        //拒绝原因为其他时 必填备注
        if (postData['cause'] == 7 && !postData['comment']) {
            this.msg.operateFail(this.languagePack['common']['tips']['inputMark'])
            return false;
        }
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
                        this.router.navigate(['/risk/list']);
                    }
                )
        }else{
            if (!postData.auditAmount && postData.status == "2") {
                let msg = this.languagePack['common']['tips']['notEmpty']
                this.msg.operateFail(msg);
                return;
            };

            if(postData.status == '9' && !postData.cause){
                let msg = this.languagePack['common']['tips']['notEmpty']
                this.msg.operateFail(msg);
                return ;
            };

            let el = <HTMLButtonElement>$event.target;

            //审核拒绝 不传审核金额
            if (postData.status == '9') {
                delete postData['auditAmount'] ;
            }


            //审核撤回 传上一次审批金额
            if (this.para['auditMoney']) {
                postData['auditAmount'] = this.para['auditMoney'];
            }

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
                        this.router.navigate(['/risk/list']);
                    }
                );
        };

    };

    refuse_enum : Array<Object> ;

    retreat_enum : Array<Object> ;
};