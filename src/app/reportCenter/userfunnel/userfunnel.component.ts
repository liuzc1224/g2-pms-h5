import { Component, OnInit } from '@angular/core';
import { SearchModel } from './searchModel';
import { TranslateService } from '@ngx-translate/core';

import { CommonMsgService } from '../../service/msg/commonMsg.service';
import { Response } from '../../share/model/reponse.model';
import { usrfunnelDataService } from '../../service/report';
import { DateObjToString } from '../../format';

let __this;
@Component({
    selector: "",
    templateUrl: "./userfunnel.component.html",
    styleUrls: ['./userfunnel.component.less']
})
export class userfunnelComponent implements OnInit {

    constructor(
        private msg: CommonMsgService,
        private usrfunnelSer: usrfunnelDataService,
        private translateSer: TranslateService
    ) { };

    searchModel: SearchModel = new SearchModel();


    sysData = []
    todayData : Object
    languagePack : Object

    ngOnInit() {
        this.initData();
        this.getLanguage();
    };

    //初始化页面数据
    initData() {
        let data = this.searchModel;

        let eTime = DateObjToString( (<Date>data.endDate) );

        data.startDate = DateObjToString( (<Date>data.startDate) ) ;
        data.endDate =  eTime && eTime.indexOf(":") == -1 ? eTime + " 23:59:59" : eTime ;

        this.usrfunnelSer.getData(data)
            .subscribe(
                (res: Response) => {
                    if (res.success) {
                        this.todayData = res.data;
                    } else {
                        this.msg.fetchFail(res.message)
                    }
                }
            )
    }

    getLanguage() {
        this.translateSer.stream(["reportModule.usrfunnelData", 'common'])
            .subscribe(
                data => {
                    this.languagePack = {
                        common: data['common'],
                        data1: data['reportModule.usrfunnelData']['table']
                    };
                }
            )
    };

    search(){
        this.initData() ;
    };

    reset() {
        this.searchModel = new SearchModel;
        this.initData();
    };
};