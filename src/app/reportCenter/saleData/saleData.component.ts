import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SearchModel } from './searchModel';

import { CommonMsgService } from '../../service/msg/commonMsg.service';
import { Response } from '../../share/model/reponse.model';
import { filter } from 'rxjs/operators';
import { saleDataService } from '../../service/report';
import { DateObjToString } from '../../format';

let __this;

@Component({
  selector: "",
  templateUrl: "./saleData.component.html",
  styleUrls: ['./saleData.component.less']
})
export class saleDataComponent implements OnInit {

  constructor(
    private msg: CommonMsgService,
    private saleSer: saleDataService,
    private translateSer: TranslateService
  ) { };

  ngOnInit() {
    this.initData();
    this.getLanguage();
  };
  languagePack: Object;

  searchModel: SearchModel = new SearchModel();

  todayData : Object ;

  historydayData : Object ;

  sysData = []

  getLanguage() {
    this.translateSer.stream(["reportModule.saleTodayData", 'common'])
      .subscribe(
        data => {
          this.languagePack = {
            common: data['common'],
            data1: data['reportModule.saleTodayData']['table1'],
            data2: data['reportModule.saleTodayData']['table2'],
            data3: data['reportModule.saleTodayData']['table3'],
            data4: data['reportModule.saleTodayData']['table4']
          };
        }
      )
  };

  //初始化页面数据
  initData(){
    this.getData();
    this.getHistoryData();
  }

  getData(){
    let data = this.searchModel;
    data.dataOfDay = DateObjToString( (<Date>data.dataOfDay) ) ;

    this.saleSer.getData(data)
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

  getHistoryData(){
    let data = this.searchModel;
    this.saleSer.getHistoryData(data)
      .subscribe(
        (res : Response) => {
          if (res.success) {
            this.historydayData = res.data || {};
          }else{
            this.msg.fetchFail(res.message)
          }
        }
      )
  }

  search(){
    this.getData() ;
    this.getHistoryData() ;
  };

  reset() {
    this.searchModel = new SearchModel;
    this.getData();
    this.getHistoryData()
  };

  _FormatData(data : Object){
    Object.keys(data).map((key, value)=>{
      let obj = {};
      obj[key] = data[key];
      this.sysData.push(obj);
    })
  }

};
