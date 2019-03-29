import { Component , OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SearchModel } from './searchModel' ;
import { Adaptor , ObjToArray } from '../../share/tool' ;
import { TableData } from '../../share/table/table.model' ;
import { DateObjToString } from '../../format';

import { LoanListService } from '../../service/fincial' ;
import { OrderService } from '../../service/order' ;
import { CommonMsgService } from '../../service/msg/commonMsg.service' ;
import { Response } from '../../share/model/reponse.model' ;
import { FormGroup , FormBuilder, Validators } from '@angular/forms' ;
import { filter } from 'rxjs/operators' ;
import { SessionStorageService } from '../../service/storage';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs'
import { GetNow, DateToStamp } from '../../share/tool';
let __this ;
@Component({
    selector : "" ,
    templateUrl : "./loanList.component.html" ,
    styleUrls : ['./loanList.component.less']
})
export class LoanListComponent implements OnInit{

    constructor(
        private translateSer : TranslateService ,
        private service : LoanListService ,
        private msg : CommonMsgService ,
        private fb : FormBuilder ,
        private sgo : SessionStorageService ,
        private router : Router ,
        private order : OrderService
    ){} ;

    ngOnInit(){
        __this = this ;
        this.getLanguage() ;
        this.validateForm = this.fb.group({
            "paymentResult" : [null , [Validators.required]] ,
            "ourBank" : [ null ],
            "serialNumber" : [ null],
            "ourAccount" : [ null ],
            "option" : [ null ] ,
            "orderId" : [ null ] ,
            "paymentType" : [ 1 ],
            // "payCode" : [ null ],
            // "repayCode" : [ null ],
            "payDate" : [ null ],
            "payMoney" : [ null ],
            "id" : [ null ]
        });
    };

    languagePack : Object ;

    statusEnum : Array < Object > ;
    repayTypeEnum : Array< Object > ;
    validateForm : FormGroup

    getLanguage(){
        this.translateSer.stream(["financeModule.list" , 'common'])
            .subscribe(
                data => {
                    this.languagePack = {
                        common : data['common'] ,
                        data : data['financeModule.list']
                    };
                    let statusData=data['financeModule.list']['status'] ;
                    statusData.forEach((element,index) => {
                        if(element['name'].indexOf('待还款')>-1){
                            statusData.splice(index,1);
                        }
                    });
                    this.statusEnum =statusData;

                    this.repayTypeEnum = data['financeModule.list']['repayType'] ;

                    this.initialTable() ;
                }
            )
    };

    searchModel : SearchModel = new SearchModel() ;

    private searchCondition : Object = {} ;

    changeStatus( status : string ){

        this.searchModel.status = status ;
        this.searchModel.currentPage = 1 ;
        this.getList() ;
    };

    tableData : TableData ;
    tableDetail:TableData;

    initialTable(){
        this.tableData = {
            loading : false ,
            showIndex : true ,
            tableTitle : [
                {
                    name : __this.languagePack['data']['table']['orderNo'] ,
                    reflect : "orderNo" ,
                    type : "text" ,
                },{
                    name : __this.languagePack['data']['table']['mobile'] ,
                    reflect : "phoneNumber" ,
                    type : "text"
                },{
                    name : __this.languagePack['data']['table']['cashTime'] ,
                    reflect : "createTime" ,
                    type : "date",
                    sort : true ,
                    sortFn : ( val , item ) => {
                        const column = item.reflect ;

                        if(val == 'top'){
                            this.searchCondition[column] = true ;
                        }else{
                            this.searchCondition[column] = false;
                        };

                        this.getList() ;
                    }
                },{
                    name : `${__this.languagePack['data']['table']['bankName']}`,
                    reflect : "bankName" ,
                    type : 'text'
                },{
                    name : __this.languagePack['data']['table']['cashAccount'] ,
                    reflect : "bankCardNum" ,
                    type : "text"
                },{
                    name : __this.languagePack['data']['table']['holderName'] ,
                    reflect : "userName" ,
                    type : "text"
                },{
                    name : `${__this.languagePack['data']['table']['loanMount']}(${__this.languagePack['data']['table']['moneyUnit']})`,
                    reflect : "applyCash" ,
                    type : "text",
                },{
                    name : __this.languagePack['data']['table']['orderStatus'],
                    reflect : "status" ,
                    type : "mark" ,
                    markColor : { '1' : "#ec971f" , '2' : "#87d068" , '3' : "#1890ff" , '4' :"#d9534f" } ,
                    filter : ( item ) => {
                        const status = item['status'] ;

                        const map = __this.languagePack['data']['status'] ;

                        let name = map.filter( item => {
                            return item.value == status ;
                        });

                        return (name && name[0].name ) ? name[0].name : "no" ;
                    }
                }
            ] ,
            btnGroup : {
                title : __this.languagePack['common']['operate']['name'] ,
                data : [{
                    textColor : "#80accf",
                    name : __this.languagePack['data']['makeLoan'],
                    ico : "anticon anticon-pay-circle-o" ,
                    showContion : {
                        name : "status" ,
                        value : [ 1 ]
                    },
                    bindFn : (item) => {
                        this.selectItem = item ;
                        this.makeLoanMark = true ;
                        this.validateForm.reset() ;
                        this.validateForm.patchValue({
                            orderId : item['orderId'],
                            payMoney : item['applyCash'] ,
                            id : item.id ,
                            paymentType : "1"
                        });
                    }
                },{
                    textColor : "#6f859c",
                    name : __this.languagePack['common']['btnGroup']['a'] ,
                    ico : "anticon anticon-file" ,
                    showContion : {
                        name : "status" ,
                        value : [ 1 , 2 , 3 , 4 ]
                    },
                    bindFn : (item) => {                    
                        let userId=item.userId;
                        let orderId=item.orderId;
                        let orderNo=item.orderNo;
                        this.getTableDetail(userId,orderId,orderNo);
                    }
                }]
            }
        };
        this.getList() ;
    };

    selectItem : object ;

    totalSize : number = 0 ;

    makeLoanMark : boolean = false ;

    noteMark : boolean = false ;

    selectOrder : Object ;
    getList(){

        this.tableData.loading = true ;

        let data = this.searchModel ;
        let eTime = DateObjToString( (<Date>data.endTime) );

        data.startTime = DateObjToString( (<Date>data.startTime) ) ;
        data.endTime =  eTime && eTime.indexOf(":") == -1 ? eTime + " 23:59:59" : eTime ;

        let sort = ObjToArray(this.searchCondition) ;
        data.columns = sort.keys ;
        data.orderBy = sort.vals ;

        this.service.getList(data)
            .pipe(
                filter( ( res : Response) => {
                    if(res.success !== true){
                        this.msg.fetchFail(res.message) ;
                    };

                    this.tableData.loading = false ;

                    if(res.data && res.data['length'] === 0){
                        this.tableData.data = [] ;
                        this.totalSize = 0 ;
                    };

                    return res.success === true  && res.data && (< Array<Object>>res.data).length > 0 ;
                })
            )
            .subscribe(
                ( res : Response ) => {

                    let data_arr = res.data ;


                    this.tableData.data = ( <Array< Object > >data_arr );

                    this.totalSize = res.page.totalNumber ;

                }
            )
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

    reset(){
        this.searchModel = new SearchModel() ;

        this.getList() ;
    };

    makeNew($event){
        let data = this.validateForm.value ;
        console.log(data);
        const chooseTime = DateToStamp(data.payDate);
        const newTime = GetNow(true);

        if (chooseTime > newTime) {
            this.msg.operateFail('Favor introduzca hora de llegar actual.') ;
            return false;
        }

        let el = <HTMLButtonElement>$event.target ;
        data.paymentResult == 2 ? data.paymentResult = true : data.paymentResult = false ;
        if(data.paymentResult ===false){
            if(!data.option){
                let msg = this.languagePack['common']['tips']['inputMark']
                this.msg.operateFail(msg) ;
                return ;
            };
        }else{
            if(!data.ourBank || !data.serialNumber || !data.ourAccount || !data.paymentType || !data.payDate || !data.payMoney){
                let msg = this.languagePack['common']['tips']['notEmpty'] ;

                this.msg.operateFail(msg) ;
                return ;
            };

            let timeStamp = data.payDate ;

            let now = new Date() ;

            let date = now.getFullYear() + "-" + (now.getMonth() + 1 ) + now.getDate() ;

            if(timeStamp > date ){
                let msg = this.languagePack['common']['tips']['diffTime'] ;
                return ;
            };
        }

        el.disabled = true ;

        this.service.makeLoan(data) 
            .pipe(
                filter( ( res : Response) => {
                    if(res.success !== true){
                        this.msg.operateFail(res.message) ;
                    };

                    el.disabled = false ;

                    return res.success === true ;
                })
            )
            .subscribe(
                (res : Response) => {

                    this.msg.operateSuccess() ;

                    this.getList() ;

                    this.makeLoanMark = false ;
                }
            )
    };

    search(){
        this.searchModel.currentPage = 1 ;
        this.getList() ;
    };
    // orderDetail(orderId : number){
    //     this.order.orderDetail(orderId)
    //         .pipe(
    //             filter( (res : Response) => {
    //                 if(res.success === false){
    //                     this.msg.fetchFail(res.message) ;
    //                 }
    //                 return res.success === true ;
    //             })
    //         )
    //         .subscribe(
    //             (res : Response ) => {
    //                 this.orderInfo = res.data ;

    //                 this.noteMark = true ;
    //             }
    //         )
    // };

    orderInfo : Object ;
    getAllInfo(id : number, cashStatus : string){
        forkJoin(
            [
                this.order.orderDetail(id) ,
                this.order.getLoanRecord({orderIds : id})
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
                    console.log(res);
                    let plan = res[1].data ? res[1].data[0] : [] ;

                    this.orderInfo = {
                        "order" : res[0].data ,
                        "plan" : plan ,
                        "cashStatus" : cashStatus
                    };
                    this.noteMark = true ;
                }
            );
    };
    getTableDetail(userId:number,orderId:number,orderNo:string){
        this.tableDetail={
            loading:false,
            showIndex:true,
            tableTitle:[
                {
                    name : __this.languagePack['data']['table']['serialNo'] ,
                    reflect : "flowingId" ,
                    type : "text" ,
                },
                {
                    name : __this.languagePack['data']['table']['createTime'] ,
                    reflect : "createTime" ,
                    type : "text" ,
                },
                {
                    name : __this.languagePack['data']['table']['circulType'] ,
                    reflect : "flowingType" ,
                    type : "text" ,
                },
                {
                    name : __this.languagePack['data']['table']['payMoney'] ,
                    reflect : "amount" ,
                    type : "text" ,
                },
                {
                    name : __this.languagePack['data']['table']['operationTime'] ,
                    reflect : "operationTime" ,
                    type : "text" ,
                },
                {
                    name : __this.languagePack['data']['table']['oper'] ,
                    reflect : "operationUserName" ,
                    type : "text" ,
                }
            ]
        }
        let data={
            userId:userId,
            orderId:orderId,
            orderNo:orderNo
        }
        this.service.getTableDetail(data)
        .pipe(
            filter( ( res : Response) => {
                if(res.success !== true){
                    this.msg.fetchFail(res.message) ;
                };

                this.tableDetail.loading = false ;

                if(res.data && res.data['length'] === 0){
                    this.tableDetail.data = [] ;
                    this.totalSize = 0 ;
                };

                return res.success === true  && res.data && (< Array<Object>>res.data).length > 0 ;
            })
        )
        .subscribe(
            ( res : Response ) => {
                let data_arr = res.data ;
                this.tableDetail.data = ( <Array< Object > >data_arr );
                if(res.page && res.page.totalNumber)
                    this.totalSize = res.page.totalNumber ;
                else
                    this.totalSize = 0 ;
            }
        )
        this.noteMark = true ;
    }

    LoanRecordInfo: Array<Object>;
    //放款详情
    getLoanRecord(orderId) {
        const query = {
            orderIds: orderId
        };

        this.order.getLoanRecord(query)
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
};
