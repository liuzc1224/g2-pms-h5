import { Component , OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SearchModel } from './searchModel' ;
import { Adaptor , ObjToArray } from '../../share/tool' ;
import { TableData } from '../../share/table/table.model' ;
import { DateObjToString } from '../../format';

import { exceptionOrderList } from '../../service/fincial' ;
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
    templateUrl : "./exceptionOrder.component.html" ,
    styleUrls : ['./exceptionOrder.component.less']
})
export class exceptionOrder implements OnInit{
    constructor(
        private translateSer : TranslateService ,
        private exceptionOrderservice : exceptionOrderList ,
        private msg : CommonMsgService ,
        private fb : FormBuilder ,
        private sgo : SessionStorageService ,
        private router : Router ,
        private order : OrderService
    ){} ;
    ngOnInit(){
        __this=this;
        this.getLanguage();
        this.validateForm = this.fb.group({
            "paymentResult" : [null , [Validators.required]] ,
            "ourBank" : [ null ],
            "serialNumber" : [ null, [Validators.required] ],
            "ourAccount" : [ null ],
            "option" : [ null ] ,
            "orderId" : [ null ] ,
            "paymentType" : [ 1 ],
            "payCode" : [ null ],
            "repayCode" : [ null ],
            "payDate" : [ null ],
            "payMoney" : [ null ],
            "id" : [ null ]
        });
    }
    public isLoanActive :boolean = true ;
    public isRepayActive :boolean = false ;
    public ordertype :string = "loan" ;
    languagePack: Object;

    statusEnum: Array<Object>;

    statusEnum1: Array<Object>;

    validateForm: FormGroup
    searchModel: SearchModel = new SearchModel();
    private searchCondition : Object = {} ;
    tableData: TableData;
    orderToggle(ordertype){
        this.ordertype=ordertype;
        if(this.ordertype=="loan"&&this.isLoanActive){
            return;
        }
        if(this.ordertype=="repay"&&this.isRepayActive){
            return;
        }
        this.isLoanActive=!this.isLoanActive;
        this.isRepayActive=!this.isRepayActive;
        this.searchModel = new SearchModel() ;
        this.getLanguage();
    }
    changeStatus( status : string ){
        this.searchModel.status = status ;
        this.searchModel.currentPage = 1 ;
        this.getList(this.ordertype);
    };
    getLanguage(){
        this.translateSer.stream(["financeModule.list" , 'common','financeModule.repayList'])
            .subscribe(
                data => {
                    this.languagePack = {
                        common : data['common'] ,
                        data : data['financeModule.list'],
                        repaylist:data['financeModule.repayList']
                    };
                    this.statusEnum = data['financeModule.list']['status'] ;                
                    this.initialTable();
                }
            )
    };
    initialTable(){
        if(this.ordertype=="loan"){
            this.tableData={
                loading:false,
                showIndex : true ,
                tableTitle : [
                    {
                        name : __this.languagePack['data']['table']['serialNo'],
                        reflect:"transactionId",
                        type : "text" ,
                    },{
                        name : __this.languagePack['data']['table']['createTime'],
                        reflect : "createDate" ,
                        type : "text",
                        sort : true ,
                        sortFn : ( val , item ) => {
                            const column = item.reflect ;
    
                            if(val == 'top'){
                                this.searchCondition[column] = true ;
                            }else{
                                this.searchCondition[column] = false;
                            };
    
                            this.getList(this.ordertype) ;
                        }
                    },{
                        name : __this.languagePack['data']['table']['tradeObject'],
                        reflect : "userName" ,
                        type : 'text'
                    },{
                        name : __this.languagePack['data']['table']['payType'] ,
                        reflect : "method" ,
                        type : "text",
                        filter : ( item ) => {
                            const status = item['method'] ;
                            const map = this.languagePack['data']['payType'];
                            let name = map.filter( item => {
                                return item.value == status ;
                            });
                            return name.length ? name[0].name : "no" ;
                        }
                    },{
                        name : __this.languagePack['data']['table']['payMoney'] ,
                        reflect : "payAmount" ,
                        type : "text"
                    },{
                        name : __this.languagePack['data']['table']['orderStatus'],
                        reflect : "status" ,
                        type : "mark" ,
                        markColor : { '1' : "#ec971f" , '2' : "#87d068" , '3' : "#1890ff" , '4' :"#d9534f" } ,
                        filter : ( item ) => {
                            const status = item['status'] ;
                            const map = this.languagePack['repaylist']['status'];
                            let name = map.filter( item => {
                                return item.value == status ;
                            });
                            return name.length ? name[0].name : "no" ;
                        }
                    },{
                        name : __this.languagePack['data']['table']['amount'],
                        reflect : "amount" ,
                        type : "text"
                    },{
                        name : __this.languagePack['data']['table']['status'],
                        reflect : "Orderstatus" ,
                        type : "mark" ,
                        markColor : { '1' : "#ec971f" , '2' : "#87d068" , '3' : "#1890ff" , '4' :"#d9534f" } ,
                        filter : ( item ) => {
                            const status = item['orderStatus'] ;
                            const map = this.languagePack['data']['status'] ;
                            let name = map.filter( item => {
                                return item.value == status ;
                            });
    
                            return name.length ? name[0].name : "no" ;
                        }                    
                    }
                ] 
            }
        }else if(this.ordertype=="repay"){
            this.tableData={
                loading:false,
                showIndex : true ,
                tableTitle : [
                    {
                        name : __this.languagePack['data']['table']['serialNo'],
                        reflect:"transactionId",
                        type : "text" ,
                    },{
                        name : __this.languagePack['data']['table']['createTime'],
                        reflect : "createDate" ,
                        type : "text",
                        sort : true ,
                        sortFn : ( val , item ) => {
                            const column = item.reflect ;
    
                            if(val == 'top'){
                                this.searchCondition[column] = true ;
                            }else{
                                this.searchCondition[column] = false;
                            };
    
                            this.getList(this.ordertype) ;
                        }
                    },{
                        name : __this.languagePack['data']['table']['tradeObject'],
                        reflect : "userName" ,
                        type : 'text'
                    },{
                        name : __this.languagePack['data']['table']['repayType'] ,
                        reflect : "method" ,
                        type : "text",
                        filter : ( item ) => {
                            const status = item['method'] ;
                            const map = this.languagePack['data']['payType'];
                            let name = map.filter( item => {
                                return item.value == status ;
                            });
                            return name.length ? name[0].name : "no" ;
                        }
                    },{
                        name : __this.languagePack['data']['table']['shouldRepay'] ,
                        reflect : "payAmount" ,
                        type : "text"
                    },{
                        name : __this.languagePack['data']['table']['orderStatus'],
                        reflect : "orderStatus" ,
                        type : "mark" ,
                        markColor : { '1' : "#ec971f" , '2' : "#87d068" , '3' : "#1890ff" , '4' :"#d9534f" },
                        filter : ( item ) => {
                            const status = item['status'] ;
                            const map = this.languagePack['repaylist']['status'];
    
                            let name = map.filter( item => {
                                return item.value == status ;
                            });
                            return name.length ? name[0].name : "no" ;
                        } 
                    },{
                        name : __this.languagePack['data']['table']['amount'],
                        reflect : "amount" ,
                        type : "text"
                    },{
                        name : __this.languagePack['data']['table']['status'],
                        reflect : "orderStatus" ,
                        type : "mark" ,
                        markColor : { '1' : "#ec971f" , '2' : "#87d068" , '3' : "#1890ff" , '4' :"#d9534f" } ,
                        filter : ( item ) => {
                            const status = item['orderStatus'] ;
                            const map = this.languagePack['data']['status'] ;
                            let name = map.filter( item => {
                                return item.value == status ;
                            });
                            return name.length ? name[0].name : "no" ;
                        } 
                    }
                ] 
            }
        }
        this.getList(this.ordertype);
    };
    selectItem : object ;

    totalSize : number = 0 ;

    makeLoanMark : boolean = false ;

    noteMark : boolean = false ;

    selectOrder : Object ;
    getList(type){
        let data = this.searchModel ;
        let eTime = DateObjToString( (<Date>data.endTime) );
    
        data.startTime = DateObjToString( (<Date>data.startTime) ) ;
        data.endTime =  eTime && eTime.indexOf(":") == -1 ? eTime + " 23:59:59" : eTime ;

        let sort = ObjToArray(this.searchCondition) ;
        data.columns = sort.keys ;
        data.orderBy = sort.vals ;
        let data_msg;
        if(this.ordertype=="loan"){
            data_msg=this.exceptionOrderservice.getLoanList(data);
        }else if(this.ordertype=="repay"){
            data_msg=this.exceptionOrderservice.getRepayList(data);
        }  
        data_msg.pipe(
            filter( ( res : Response) => {
                if(res.success !== true){
                    this.msg.fetchFail(res.message) ;
                };

                if(res.data && res.data['length'] === 0){
                    this.tableData.data = [] ;
                    this.totalSize = 0 ;
                };

                return res.success === true  && res.data && (< Array<Object>>res.data).length > 0 ;
            })
        )
        .subscribe(
            ( res : Response ) => {
                const result=(<Array<any>>res.data).map(item=>{
                    if(item.payAmount==null){
                        item.payAmount="0";
                    }
                    if(item.amount==null){
                        item.amount="0";
                    }
                    return item;
                });
                let data_arr = result ;
                this.tableData.data = ( <Array< Object > >data_arr );
                if(res.page && res.page.totalNumber)
                    this.totalSize = res.page.totalNumber ;
                else
                    this.totalSize = 0 ;
            }
        )
    } 
    pageChange($size : number , type : string) : void{
        if(type == 'size'){
            this.searchModel.pageSize = $size ;
        };
        if(type == 'page'){
            this.searchModel.currentPage = $size ;
        };
        this.getList(this.ordertype) ;
    };

    reset(){
        this.searchModel = new SearchModel() ;
        this.getList(this.ordertype);
    };
    export(){
        let data = this.searchModel ;
        if(this.ordertype=="loan"){
             this.exceptionOrderservice.excelExportLoan(data);
        }else if(this.ordertype=="repay"){
             this.exceptionOrderservice.excelExportRepay(data);
        }
    }
}