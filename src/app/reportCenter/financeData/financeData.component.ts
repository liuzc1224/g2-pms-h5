import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { TableData } from '../../share/table/table.model';
import { SearchModel } from './searchModel';
import { financeDataService } from '../../service/report';
import { CommonMsgService } from '../../service/msg/commonMsg.service';
import { Response } from '../../share/model/reponse.model';
import { filter } from 'rxjs/operators';
import { DateObjToString } from '../../format';

let __this;
@Component({
    selector: "",
    templateUrl: "./financeData.component.html",
    styleUrls: ['./financeData.component.less']
})
export class financeDataComponent implements OnInit {

    constructor(
        private msg: CommonMsgService,
        private translateSer: TranslateService,
        private finService: financeDataService
    ) { };

    searchModel: SearchModel = new SearchModel();

    languagePack: Object;

    todayData : Object ;

    historydayData : Object ;

    ngOnInit() {
        this.initData();
        this.getLanguage();
    };

    getLanguage() {
        this.translateSer.stream(["reportModule.financedata", 'common'])
            .subscribe(
                data => {
                    this.languagePack = {
                        common: data['common'],
                        data1: data['reportModule.financedata']['table1'],
                        data2: data['reportModule.financedata']['table2'],
                        data3: data['reportModule.financedata']['table3']
                    };
                    this.initialTable();
                }
            )
    };

    //初始化页面数据
    initData(){
        this.getData();
        this.getHistoryData();
    }

    getData(){
        this.finService.getData()
        .subscribe(
            (res : Response) => {
                if (res.success) {
                    this.todayData = res.data;
                }else{
                    this.msg.fetchFail(res.message)
                }
            }
        )
    }

    tableData: TableData;

    totalSize: number = 0;

    initialTable() {
        let langdata3 = this.languagePack['data3'];
        this.tableData = {
            tableTitle: [
                {
                    name: langdata3[0]['dec'],
                    reflect: langdata3[0]['reflect'],
                    type: "text",
                }, {
                    name: langdata3[1]['dec'],
                    reflect: langdata3[1]['reflect'],
                    type: "text"
                }, {
                    name: langdata3[2]['dec'],
                    reflect: langdata3[2]['reflect'],
                    type: "text"
                },{
                    name: langdata3[3]['dec'],
                    reflect: langdata3[3]['reflect'],
                    type: "text",
                }, {
                    name: langdata3[4]['dec'],
                    reflect: langdata3[4]['reflect'],
                    type: "text",
                },{
                    name: langdata3[5]['dec'],
                    reflect: langdata3[5]['reflect'],
                    type: "text",
                }, {
                    name: langdata3[6]['dec'],
                    reflect: langdata3[6]['reflect'],
                    type: "text",
                }
            ],
            loading: false,
            showIndex: true,
        };
        this.getHistoryData();
    };

    getHistoryData(){
        // this.tableData.loading = true;
        let data = this.searchModel;
        data.startTime = this.DateToMouth(data.startTime);
        data.endTime = this.DateToMouth(data.endTime);

        this.finService.getHistoryData(data)
            .pipe(
                filter((res: Response) => {
                    if (res.success !== true) {
                        this.msg.fetchFail(res.message);
                    };

                    // this.tableData.loading = false;

                    if (res.data && res.data['length'] === 0) {
                        this.tableData.data = [];
                        this.totalSize = 0 ;
                    };

                    return res.success === true && res.data && (<Array<Object>>res.data).length > 0;
                })
            )
            .subscribe(
                (res : Response) => {
                    let data_arr = res.data;

                    this.tableData.data = (<Array<Object>>data_arr);

                    this.totalSize = res.page.totalNumber;
                }
            )
    }

    pageChange($size: number, type: string): void {
        if (type == 'size') {
            this.searchModel.pageSize = $size;
        };

        if (type == 'page') {
            this.searchModel.currentPage = $size;
        };
        this.getHistoryData();
    };

    fixZero (number: number) {
        return number >= 10 ? number : "0" + number;
    };

    DateToMouth (date: Date) {

        if (date instanceof Date) {
            return date.getFullYear() + "/" + this.fixZero((date.getMonth() + 1));
        } else {
            return date
        }
    };

    search(){
        this.searchModel.currentPage = 1 ;
        this.getHistoryData() ;
    };
    reset() {
        this.searchModel = new SearchModel;
        this.getHistoryData();
    };
};