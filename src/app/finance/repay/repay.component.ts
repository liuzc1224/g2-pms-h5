import { Component , OnInit } from '@angular/core' ;
import { SearchModel } from './searchModel';
import { Adaptor , ObjToArray } from '../../share/tool' ;
import { TranslateService } from '@ngx-translate/core';
import { TableData } from '../../share/table/table.model' ;
import { RepayListService } from '../../service/fincial';
import { Response } from '../../share/model'
import { CommonMsgService } from '../../service/msg';
import { FormGroup , FormBuilder, Validators} from '@angular/forms'
import { NumberValidator } from '../../share/validator'
import { Router } from '@angular/router';
import { DateObjToString , unixTime } from '../../format' ;
import { filter } from 'rxjs/operators'
import { OrderService } from '../../service/order';
import { forkJoin } from 'rxjs';
import {setHours, differenceInCalendarDays} from 'date-fns';
@Component({
    selector :"app-repay" ,
    templateUrl :"./repay.component.html" ,
    styleUrls : ['./repay.component.less']
})
export class RepayComponent implements OnInit{
    constructor(
        private translate : TranslateService ,
        private service : RepayListService ,
        private msg : CommonMsgService ,
        private fb :FormBuilder ,
        private router : Router ,
        private order : OrderService
    ){};

    ngOnInit(){
        this.getLanguage() ;

        this.validateForm = this.fb.group({
            "money" : [null , [Validators.required , NumberValidator.isNumber]]
        });

        this.hasClearForm = this.fb.group({
            "isDone" : [ null , [Validators.required]] ,
            "orderId" : [null] ,
            "orderNo" : [null] ,
            "repayMoney" : [null ] ,
            "repayType" : [null ] ,
            "repaymentDate" : [null ] ,
            "description" : [null, [Validators.required]] ,
            "currentRepay" : [null ] ,
            "repaymentPlanId" : [null ],
            "userId" : [null ],
            "transactionId" : [ null , [Validators.required]],
        });

    };

    searchModel : SearchModel = new SearchModel() ;

    private searchCondition : Object  = {} ;

    validateForm : FormGroup  ;

    languagePack : object ;

    hasClearForm : FormGroup ;

    getLanguage(){
        this.translate.stream(['common' , 'financeModule.repayList'])
            .subscribe(
                res => {
                    this.languagePack = {
                        common : res['common'] ,
                        repayList : res['financeModule.repayList']
                    };

                    this.getEnum(this.languagePack['repayList']['status']) ;

                    this.reapyEnum = this.languagePack['repayList']['repayType'] ;

                    this.initTable() ;
                }
            )
    };

    statusEnum : Array< Object > ;

    status : string ;

    getEnum( data : Array< Object > ){
        this.statusEnum = data ;
    };

    reapyEnum : Array< {name : string , value : number} > ;

    tableData : TableData ;

    totalSize : number = 0 ;

    remark : Object ;
    initTable(){

        let data = this.languagePack['repayList']['table'];

        let orderNo = data['orderNo'] ;

        let mobile = data['mobile'] ;

        let loanMount = data['loanMount'] + "(" + data['moneyUnit'] + ")";

        let limit = data['limit']  + "(" + data['limitUnit'] + ")";

        let repayDate = data['repayDate'] ;

        let repayShuold = data['repayShuold'] + "(" + data['moneyUnit'] + ")";

        let repayTotal = data['realRepayMoney'] + "(" + data['moneyUnit'] + ")";

        let overDueFine = data['overDueFine'] + "(" + data['moneyUnit'] + ")";
        let dueDay = data['dueDay'] ;

        let oper = this.languagePack['common']['operate']['name']

        let hasClear = this.languagePack['repayList']['oper']['hasClear'];
        let operate=this.languagePack['repayList']['oper']['operate'];

        let makeClear = this.languagePack['repayList']['oper']['makeClear'];

        let status = data['status'] ;

        let usrName = data['userName'] ;

        let detail = this.languagePack['common']['btnGroup']['a'] ;

        this.tableData = {
            showIndex : true ,
            loading : false ,
            tableTitle : [
                {
                    name : orderNo ,
                    reflect :"orderNo" ,
                    type : "text" ,
                },
                {
                    name : usrName ,
                    reflect : "userName" ,
                    type : "text"
                },{
                    name : mobile ,
                    reflect : "userPhone" ,
                    type :"text" ,
                },/*{
                    name : limit ,
                    reflect : "totalPeriod" ,
                    type :'text' ,
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
                },*/{
                    name : repayDate ,
                    reflect : "planRepaymentDate" ,
                    type : 'date' ,
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
                },{
                    name : repayShuold ,
                    reflect : 'currentRepay' ,
                    type :'text',
                },{
                    name : overDueFine ,
                    reflect : 'overDueFine' ,
                    type :'text',
                    filter : ( item ) => {
                        return item.overDueFine === null ? 0 : item.overDueFine ;
                    }
                },{
                    name : repayTotal ,
                    reflect : 'realRepayMoney',
                    type : 'text' ,
                    // sort : true ,
                    // sortFn : ( val , item ) => {
                    //     const column = item.reflect ;

                    //     if(val == 'top'){
                    //         this.searchCondition[column] = true ;
                    //     }else{
                    //         this.searchCondition[column] = false;
                    //     };

                    //     this.getList() ;
                    // },
                    // color : "#40a9ff",
                    // fn : ( item ) => {
                    //     this.selectItem = item ;

                    //     this.hasClearMark = true ;
                    //     let userId = item.userId;

                    //     this.hasClearForm.reset() ;

                    //     this.hasClearForm.patchValue({
                    //         orderId : item.orderId ,
                    //         isDone : false ,
                    //         currentRepay : item.currentRepay ,
                    //         repaymentPlanId : item.id ,
                    //         userId : userId
                    //     });
                    // },
                    filter : ( item ) => {
                        return item.realRepayMoney === null ? 0 : item.realRepayMoney ;
                    }
                }
                ,{
                    name : dueDay ,
                    reflect : 'dueDay' ,
                    type :'text',
                },{
                    name : status ,
                    reflect : 'status',
                    type : "mark" ,
                    markColor : { '1' : "#ec971f" , '2' : "#87d068" , '3' : "#1890ff" , '4' :"#d9534f" , '5' : "#4e0ba7" } ,
                    filter : ( item ) => {
                        const status = item['status'] ;

                        const map = this.languagePack['repayList']['status'] ;

                        let name = map.filter( item => {
                            return item.value == status ;
                        });

                        return name.length ? name[0].name : "no" ;
                    }
                }
            ],
            btnGroup : {
                title : oper ,
                data : [
                    {
                        name : operate ,
                        textColor : "#80accf",
                        ico : "anticon anticon-pay-circle-o" ,
                        showContion : {
                            name : "status" ,
                            value : [ 1 , 2 , 3 ,4 , 5,6]
                        },
                        bindFn : (item) => {
                            this.selectItem = item ;
                            this.hasClearForm.reset() ;
                            let userId = item.userId;
                            // let shuoldPay =
                            let obj = {
                                "orderId" : item['orderId'] ,
                                "repayMoney" : this.Subtr(item['currentRepay'],item['realRepayMoney']),
                                "currentRepay" : item['currentRepay'] ,
                                "repaymentPlanId" : item.id,
                                "userId" : userId ,
                                "repayType" : "1",
                                'orderNo':item['orderNo']
                            };
                            // this.hideSeleIndex = true;
                            if (item['status'] == 1) {
                                this.hideRepay = false;
                                this.hideRemoke=true;
                            }else if(item['status'] == 3||item['status'] == 5){
                                this.hideRepay = false;
                                this.hideRemoke=false;
                            }else if(item['status'] == 4||item['status'] == 6){
                                this.hideRepay = true;
                                this.hideRemoke=false;
                                this.hasClearForm.patchValue({isDone:'3'});
                            }
                            this.hasClearForm.patchValue(obj);
                            this.hasClearMark = true ;
                        }
                    },{
                        textColor : "#6f859c",
                        name : detail,
                        ico : "anticon anticon-file" ,
                        showContion : {
                            name : "status" ,
                            value : [ 1 , 2 , 3 , 4 ,5,6 ]
                        },
                        bindFn : (item) => {

                            // this.noteMark = true ;

                            // this.orderDetail(item.orderId);
                            this.getAllInfo(item.orderId)
                            this.selectOrder = item
                            const status = item['status'] ;

                            const map = this.languagePack['repayList']['status'] ;

                            let name = map.filter( item => {
                                return item.value == status ;
                            });
                            this.selectOrder['repayStatus'] = (name && name[0].name ) ? name[0].name : "no" ;

                            // this.remark = item
                        }
                    }
                ]
            }
        };

        this.getList() ;
    }
    hideRepay : boolean = true;
    hideRemoke:boolean=true;
    selectOrder : Object ;

    getList(){
        this.tableData.loading = true ;
        let data = this.searchModel ;

        data.minPlanRepaymentDate = DateObjToString( (<Date>data.minPlanRepaymentDate) ) ;
        data.maxPlanRepaymentDate = DateObjToString( (<Date>data.maxPlanRepaymentDate) ) ;

        let sort = ObjToArray(this.searchCondition) ;
        data.columns = sort.keys ;
        data.orderBy = sort.vals ;

        this.service.getList(data)
            .subscribe(
                ( res : Response ) => {
                    this.tableData.loading = false ;
                    if(res.success === true){
                        const result=(<Array<any>>res.data).map(item=>{
                            if(item.dueDay==null){
                                item.dueDay="0";
                            }
                            return item;
                        });
                        let data_arr = result ;
                        this.tableData.data = ( <Array< Object > >data_arr );
                        if(res.page && res.page.totalNumber)
                            this.totalSize = res.page.totalNumber ;
                        else
                            this.totalSize = 0 ;
                    }else{
                        this.msg.fetchFail(res.message)
                    }
                }
            )
    };
    selectItem : object ;

    hasClearMark : boolean = false ;

    changeMoneyMark : boolean = false ;

    changeMoney(){

    };
    
Subtr(arg1,arg2){
    var r1,r2,m,n;
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2));
    //动态控制精度长度
    n=(r1>=r2)?r1:r2;
    return ((arg1*m-arg2*m)/m).toFixed(2);
}


    changeStatus( status : string ){
        // if (status === 'null') {
        //     this.reset();
        //     return false;
        // }
        // let statusArr = [];
        // statusArr.push(status);
        this.searchModel.currentPage = 1 ;
        this.searchModel.status = status ;
        this.getList() ;
    };

    clearBill($event){
        let postData = this.hasClearForm.value ;
        postData.repaymentDate = DateObjToString(postData.repaymentDate) ;
        let target = <HTMLButtonElement>$event.target;
        target.disabled = true;
        if(!postData.orderNo){
            let msg = this.languagePack['common']['tips']['orderNoNeed']
                this.msg.operateFail(msg) ;
                target.disabled = false ;
                return ;
        }
        if(postData.isDone == 'false'){
            let currentRepay = this.selectItem['currentRepay'] ;
            let realRepay = postData.repayMoney / 1;
            if( realRepay > currentRepay){
                let msg = this.languagePack['common']['tips']['overflow']
                this.msg.operateFail(msg) ;
                target.disabled = false ;
                return ;
            };
        };
        let result;
        if(postData.isDone == 'true'||postData.isDone == 'false'){
            if(!postData.description||!postData.repayMoney||!postData.transactionId||!postData.repaymentDate){
                let msg = this.languagePack['common']['tips']['inputMark']
                this.msg.operateFail(msg) ;
                return ;
            };
            result=this.service.makeRepay(postData);
        }else if(postData.isDone == '3'){
            let data={
                orderId:postData.orderId,
                orderNo:postData.orderNo,
                transactionId:postData.transactionId
            }
            result=this.service.revokeFlowing(data);
        }
            result.pipe(
                filter( (res :Response ) => {

                    if(res.success === false){
                        this.msg.operateFail(res.message) ;
                    };

                    target.disabled = false;

                    return res.success === true ;
                })
            )
            .subscribe(
                ( res : Response) => {
                    this.msg.operateSuccess() ;

                    this.hasClearMark = false ;

                    this.getList() ;
                }
            )
    };

    reset(){
        this.searchModel = new SearchModel() ;
        this.getList() ;
    };

    pageChange($size : number , type : string) : void{
        if(type == 'size'){
            this.searchModel.pageSize = $size ;
        };

        if(type == 'page'){
            this.searchModel.currentPage = $size ;
        };
        this.getList() ;
    };

    search(){
        this.searchModel.currentPage = 1 ;
        this.getList() ;
    };

    // orderInfo : Object ;
    noteMark : boolean = false ;
    orderDetail(orderId : number){
        this.order.orderDetail(orderId)
            .pipe(
                filter( (res : Response) => {
                    if(res.success === false){
                        this.msg.fetchFail(res.message) ;
                    }
                    return res.success === true ;
                })
            )
            .subscribe(
                (res : Response ) => {
                    this.orderInfo = res.data ;

                    this.noteMark = true ;
                }
            )
    };
    orderInfo : Object ;
    getAllInfo(id : number){
        forkJoin(
            [
                this.order.orderDetail(id) ,
                this.order.getRepaymentRecord({orderIds : id})
            ]
        )
            .pipe(
                filter(
                    (res : Array<Response>) => {

                        if(res[0].success === false){
                            this.msg.operateFail(res[0].message) ;
                        };

                        if(res[1].success === false){
                            this.msg.operateFail(res[1].message) ;
                        };

                        return res[0].success === true  && res[1].success === true ;
                    }
                )
            )
            .subscribe(
                (res : Array<Response> ) => {

                    // this.orderDetail = res.data ;

                    let plan = res[1].data ? res[1].data[0] : [] ;

                    this.orderInfo = {
                        "order" : res[0].data ,
                        "plan" : plan
                    };

                    this.noteMark = true ;
                }
            );
    };

    today = new Date();
    timeDefaultValue = setHours(new Date(), 0);

    range(start: number, end: number): number[] {
        const result = [];
        for (let i = start; i < end; i++) {
        result.push(i);
        }
        return result;
    }

    disabledDate = (current: Date): boolean => {
        // Can not select days before today and today
        return differenceInCalendarDays(current, this.today) > 0;
    };

    disabledDateTime = (): object => {
        return {
        nzDisabledHours  : () => this.range(0, 24).splice(4, 20),
        nzDisabledMinutes: () => this.range(30, 60),
        nzDisabledSeconds: () => [ 55, 56 ]
        };
    };

    disabledRangeTime = (value: Date[], type: 'start' | 'end'): object => {
        if (type === 'start') {
        return {
            nzDisabledHours  : () => this.range(0, 60).splice(4, 20),
            nzDisabledMinutes: () => this.range(30, 60),
            nzDisabledSeconds: () => [ 55, 56 ]
        };
        }
        return {
        nzDisabledHours  : () => this.range(0, 60).splice(20, 4),
        nzDisabledMinutes: () => this.range(0, 31),
        nzDisabledSeconds: () => [ 55, 56 ]
        };
    };

};
