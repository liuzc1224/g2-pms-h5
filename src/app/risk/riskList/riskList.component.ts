import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { SearchModel } from './searchModel';
import { Adaptor , ObjToArray } from '../../share/tool' ;
import { TableData } from '../../share/table/table.model';
import { unixTime } from '../../format';

import { RiskListService } from '../../service/risk';
import { CommonMsgService } from '../../service/msg/commonMsg.service';
import { Response } from '../../share/model/reponse.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { filter } from 'rxjs/operators';
import { SessionStorageService } from '../../service/storage';
import { DateObjToString } from '../../format';
import { OrderService } from '../../service/order';

let __this;
@Component({
    selector: "",
    templateUrl: "./riskList.component.html",
    styleUrls: ['./riskList.component.less']
})
export class riskListComponent implements OnInit {

    constructor(
        private translateSer: TranslateService,
        private service: RiskListService,
        private msg: CommonMsgService,
        private fb: FormBuilder,
        private router: Router ,
        private sgo : SessionStorageService,
        private orderSer : OrderService
    ) { };

    ngOnInit() {
        __this = this;

        this.getLanguage();

        this.validateForm = this.fb.group({
            "orderStatus": [null, [Validators.required]],
            "backName": [null, [Validators.required]],
            "billNo": [null, [Validators.required]],
            "account": [null, [Validators.required]],
            "reamark": [null]
        });

    };

    languagePack: Object;

    statusEnum: Array<Object>;

    statusEnum1: Array<Object>;

    validateForm: FormGroup

    getLanguage() {
        this.translateSer.stream(["financeModule.list", 'common', 'riskModule'])
            .subscribe(
                data => {
                    this.languagePack = {
                        common: data['common'],
                        data: data['financeModule.list'],
                        risk: data['riskModule']
                    };
                    this.statusEnum = data['riskModule']['searchTabStatus'];
                    this.statusEnum1 = data['riskModule']['searchTabStatus1'];

                    this.initialTable();
                }
            )
    };

    searchModel: SearchModel = new SearchModel();
    private searchCondition : Object  = {} ;

    changeStatus(status: string) {
        this.searchModel.status = status;
        this.searchModel.currentPage = 1;
        this.getList();
    };

    tableData: TableData;

    initialTable() {
        this.tableData = {
            tableTitle: [
                {
                    name: __this.languagePack['data']['table']['orderNo'],
                    reflect: "orderNo",
                    type: "text"
                }, {
                    name: __this.languagePack['data']['table']['askTime'],
                    reflect: "createTime",
                    type: "text",
                    sort : true ,
                    sortFn : ( val , item ) => {
                        const column = item.reflect ;

                        if(val == 'top'){
                            this.searchCondition[column] = true ;
                        }else{
                            this.searchCondition[column] = false;
                        };

                        this.getList() ;
                    },
                    filter: (item) => {
                        return unixTime(item.createTime, 'y-m-d h:i:s');
                    }
                }, {
                    name: __this.languagePack['data']['table']['mobile'],
                    reflect: "userPhone",
                    type: "text"
                }, {
                    name: `${__this.languagePack['data']['table']['loanMount']}(${__this.languagePack['data']['table']['moneyUnit']})`,
                    reflect: "applyMoney",
                    type: "text"
                    // sort : true ,
                    // sortFn : ( val , item ) => {
                    //     const column = item.reflect ;

                    //     if(val == 'top'){
                    //         this.searchCondition[column] = true ;
                    //     }else{
                    //         this.searchCondition[column] = false;
                    //     };

                    //     this.getList() ;
                    // }
                },{
                    name: `${__this.languagePack['data']['table']['auditMoney']}(${__this.languagePack['data']['table']['moneyUnit']})`,
                    reflect: "auditMoney",
                    type: "text",
                    // sort : true ,
                    // sortFn : ( val , item ) => {
                    //     const column = item.reflect ;

                    //     if(val == 'top'){
                    //         this.searchCondition[column] = true ;
                    //     }else{
                    //         this.searchCondition[column] = false;
                    //     };

                    //     this.getList() ;
                    // }
                }, {
                    name: __this.languagePack['data']['table']['limit'],
                    reflect: "loanDays",
                    type: "text",
                    // sort : true ,
                    // sortFn : ( val , item ) => {
                    //     const column = item.reflect ;

                    //     if(val == 'top'){
                    //         this.searchCondition[column] = true ;
                    //     }else{
                    //         this.searchCondition[column] = false;
                    //     };

                    //     this.getList() ;
                    // }
                },{
                    name: __this.languagePack['data']['table']['loanPurpose'],
                    reflect: "loanDays",
                    type: "text",
                    filter : ( val ) =>{
                        let enumVal = this.orderSer.getPurposeEnum(this.sgo.get('locale'));

                        let item = enumVal.find( ele => {
                            return ele.value == val['borrowPurpose'] ;
                        });

                        return  ( item && item.name ) ? item.name : "" ;
                    }
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
                    },
                }
            ],
            loading: false,
            showIndex: true,
            btnGroup: {
                title: __this.languagePack['common']['operate']['name'],
                data: [{
                    textColor: "#80accf",
                    name: __this.languagePack['common']['btnGroup']['a'],
                    // ico : "anticon anticon-pay-circle-o" ,
                    showContion: {
                        name: "status",
                        value: [1, 2, 3, 4, 6, 9, 12, 13]
                    },
                    bindFn: (item) => {
                        this.sgo.set("orderInfo" , item) ;

                        this.router.navigate(['/usr/auth'], {
                            queryParams: {
                                from: "riskList",
                                status: item["status"],
                                usrId: item["userId"],
                                order : item['id'],
                                applyMoney: item['applyMoney']
                            }
                        });
                    }
                } /*, {
                    textColor: "#80accf",
                    name: __this.languagePack['common']['btnGroup']['b'],
                    // ico : "anticon anticon-pay-circle-o" ,
                    showContion: {
                        name: "status",
                        value: [9]
                    },
                    bindFn: (item) => {
                        this.noteMark = true ;
                        // this.remark = item.
                    }
                } */]
            }
        };
        this.getList();
    };

    selectItem: object;

    totalSize: number = 0;

    makeLoanMark: boolean = false;

    noteMark : boolean = false ;

    remark : string = '' ;

    getList() {

        this.tableData.loading = true;

        let data = this.searchModel;

        let eTime = DateObjToString( (<Date>data.endTime) );

        data.startTime = DateObjToString( (<Date>data.startTime) ) ;
        data.endTime =  eTime && eTime.indexOf(":") == -1 ? eTime + " 23:59:59" : eTime ;
        let sort = ObjToArray(this.searchCondition) ;
        data.columns = sort.keys ;
        data.orderBy = sort.vals ;

        this.service.getList(data)
            .pipe(
                filter((res: Response) => {
                    if (res.success !== true) {
                        this.msg.fetchFail(res.message);
                    };

                    this.tableData.loading = false;

                    if (res.data && res.data['length'] === 0) {
                        this.tableData.data = [];
                        this.totalSize = 0 ;
                    };

                    return res.success === true && res.data && (<Array<Object>>res.data).length > 0;
                })
            )
            .subscribe(
                (res: Response) => {

                    let data_arr = res.data;

                    this.tableData.data = (<Array<Object>>data_arr);

                    this.totalSize = res.page.totalNumber;
                }
            )
        // .subscribe(
        //     ( res : Response ) => {
        //         if(res.success === true){

        //             let data_arr = res.data ;

        //             this.tableData.data = ( <Array< Object > >data_arr );

        //             this.totalSize = res.page.totalPage ;

        //         }else{
        //             this.msg.fetchFail(res.message) ;
        //         };

        //         this.tableData.loading = false ;
        //     }
        // )
    };

    pageChange($size: number, type: string): void {
        if (type == 'size') {
            this.searchModel.pageSize = $size;
        };

        if (type == 'page') {
            this.searchModel.currentPage = $size;
        };
        this.getList();
    };

    reset() {
        this.searchModel = new SearchModel;

        this.getList();
    };

    makeNew($event) {
        let data = this.validateForm.value;

        let el = <HTMLButtonElement>$event.target;

        el.disabled = true;

        this.service.postLoan(data)
            .subscribe(
                (res: Response) => {
                    if (res.success === true) {

                        this.msg.operateSuccess();

                        this.getList();

                        this.makeLoanMark = false;
                    } else {
                        this.msg.operateFail(res.message);
                    };
                }
            )
    };

    search(){
        this.searchModel.currentPage = 1 ;
        this.getList() ;
    };
};