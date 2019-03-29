import {Component, OnInit, ViewChild} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Adaptor} from '../../share/tool';
import {TableData} from '../../share/table/table.model';
import {dataFormat} from '../../format';
import {CommonMsgService} from '../../service/msg/commonMsg.service';
import {Response} from '../../share/model/reponse.model';
import {SearchModel} from './searchModel';
import {OrderListService} from '../../service/order';
import {filter} from 'rxjs/operators';
import {SessionStorageService} from '../../service/storage';
import {Router} from '@angular/router';
import {DateObjToString} from '../../format';

@Component({
  selector: 'loan-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {
  constructor(
    private translateSer: TranslateService,
    private msg: CommonMsgService,
    private orderSer: OrderListService,
    private sgo: SessionStorageService,
    private router: Router
  ) {
  };

  ngOnInit() {
    this.getLanguage();
  };

  searchModel: SearchModel = new SearchModel();

  private searchCondition: Object = {};

  statusEnum: Array<{ name: string, value: number }>;

  languagePack: Object;


  getLanguage() {
    this.translateSer.stream(['orderList.allList', 'common'])
      .subscribe(
        data => {
          this.languagePack = {
            common: data['common'],
            data: data['orderList.allList'],
          };

          this.statusEnum = data['orderList.allList']['status'];
          this.initialTable();
        }
      );
  };

  tableData: TableData;

  initialTable() {

    const i18nTable = this.languagePack['data']['table'];

    const orderNo = i18nTable['orderNo'];
    const userName = i18nTable['userName'];
    const userPhone = i18nTable['userPhone'];
    const userId = i18nTable['userId'];
    const applyMoney = i18nTable['applyMoney'];
    const applyMonth = i18nTable['applyMonth'];
    const appreciationMoney = i18nTable['appreciationMoney'];
    const appreciationRate = i18nTable['appreciationRate'];
    const currentRepay = i18nTable['currentRepay'];
    const overDueRateMoney = i18nTable['overDueRateMoney'];
    const currentRealRepay = i18nTable['currentRealRepay'];
    const lendRateMoney = i18nTable['lendRateMoney'];
    const lendRate = i18nTable['lendRate'];
    const loanDays = i18nTable['loanDays'];
    const overDueRate = i18nTable['overDueRate'];
    const createTime = i18nTable['createTime'];
    const modifyTime = i18nTable['modifyTime'];
    const payDate = i18nTable['payDate'];
    const status = i18nTable['status'];
    this.tableData = {
      tableTitle: [
        {
          name: orderNo,
          reflect: 'orderNo',
          type: 'text',
        }, {
          name: userName,
          reflect: 'userName',
          type: 'text',
        }, {
          name: userPhone,
          reflect: 'userPhone',
          type: 'text',
        }, {
          name: userId,
          reflect: 'userId',
          type: 'text',
        }, {
          name: applyMoney,
          reflect: 'applyMoney',
          type: 'text',
          sort: true,
          sortFn: (val, item) => {
            const column = item.reflect;

            if (val == 'top') {
              this.searchCondition[column] = true;
            } else {
              this.searchCondition[column] = false;
            }
            ;

            this.getList();
          },
        }, {
          name: applyMonth,
          reflect: 'applyMonth',
          type: 'text',
          sort: true,
          sortFn: (val, item) => {
            const column = item.reflect;

            if (val == 'top') {
              this.searchCondition[column] = true;
            } else {
              this.searchCondition[column] = false;
            }
            ;

            this.getList();
          },
        }, {
          name: appreciationMoney,
          reflect: 'appreciationMoney',
          type: 'text',
          sort: true,
          sortFn: (val, item) => {
            const column = item.reflect;

            if (val == 'top') {
              this.searchCondition[column] = true;
            } else {
              this.searchCondition[column] = false;
            }
            ;

            this.getList();
          },
        }, {
          name: appreciationRate,
          reflect: 'appreciationRate',
          type: 'text',
          sort: true,
          sortFn: (val, item) => {
            const column = item.reflect;

            if (val == 'top') {
              this.searchCondition[column] = true;
            } else {
              this.searchCondition[column] = false;
            }
            ;

            this.getList();
          },
        }, {
          name: currentRepay,
          reflect: 'currentRepay',
          type: 'text',
        }, {
          name: overDueRateMoney,
          reflect: 'overDueRateMoney',
          type: 'text',
          sort: true,
          sortFn: (val, item) => {
            const column = item.reflect;

            if (val == 'top') {
              this.searchCondition[column] = true;
            } else {
              this.searchCondition[column] = false;
            }
            ;

            this.getList();
          },
        }, {
          name: currentRealRepay,
          reflect: 'currentRealRepay',
          type: 'text',
          sort: true,
          sortFn: (val, item) => {
            const column = item.reflect;

            if (val == 'top') {
              this.searchCondition[column] = true;
            } else {
              this.searchCondition[column] = false;
            }
            ;

            this.getList();
          },
        }, {
          name: lendRateMoney,
          reflect: 'lendRateMoney',
          type: 'text',
          sort: true,
          sortFn: (val, item) => {
            const column = item.reflect;

            if (val == 'top') {
              this.searchCondition[column] = true;
            } else {
              this.searchCondition[column] = false;
            }
            ;

            this.getList();
          },
        }, {
          name: lendRate,
          reflect: 'lendRate',
          type: 'text',
          sort: true,
          sortFn: (val, item) => {
            const column = item.reflect;

            if (val == 'top') {
              this.searchCondition[column] = true;
            } else {
              this.searchCondition[column] = false;
            }
            ;

            this.getList();
          },
        }, {
          name: loanDays,
          reflect: 'loanDays',
          type: 'text',
          sort: true,
          sortFn: (val, item) => {
            const column = item.reflect;

            if (val == 'top') {
              this.searchCondition[column] = true;
            } else {
              this.searchCondition[column] = false;
            }
            ;

            this.getList();
          },
        }, {
          name: overDueRate,
          reflect: 'overDueRate',
          type: 'text',
          sort: true,
          sortFn: (val, item) => {
            const column = item.reflect;

            if (val == 'top') {
              this.searchCondition[column] = true;
            } else {
              this.searchCondition[column] = false;
            }
            ;

            this.getList();
          },
        }, {
          name: createTime,
          reflect: 'createTime',
          type: 'date',
          sort: true,
          sortFn: (val, item) => {
            const column = item.reflect;

            if (val == 'top') {
              this.searchCondition[column] = true;
            } else {
              this.searchCondition[column] = false;
            }
            ;

            this.getList();
          },
        }, {
          name: modifyTime,
          reflect: 'modifyTime',
          type: 'date',
          sort: true,
          sortFn: (val, item) => {
            const column = item.reflect;

            if (val == 'top') {
              this.searchCondition[column] = true;
            } else {
              this.searchCondition[column] = false;
            }
            ;

            this.getList();
          },
        }, {
          name: payDate,
          reflect: 'payDate',
          type: 'date',
          sort: true,
          sortFn: (val, item) => {
            const column = item.reflect;

            if (val == 'top') {
              this.searchCondition[column] = true;
            } else {
              this.searchCondition[column] = false;
            }
            ;

            this.getList();
          },
        }, {
          name: status,
          reflect: 'status',
          type: 'mark',
          markColor: {
            '1': '#ec971f',
            '2': '#87d068',
            '3': '#1890ff',
            '4': '#1890ff',
            '5': '#d9534f',
            '6': '#1890ff',
            '7': '#1890ff',
            '8': '#d9534f',
            '9': '#d9534f',
            '10': '#d9534f',
            '11': '#d9534f',
            '12': '#d9534f',
            '13': '#d9534f'
          },
          filter: (item) => {
            const status = item['status'];

            const map = this.statusEnum;

            let name = map.filter(item => {
              return item.value == status;
            });
            return (name && name[0].name) ? name[0].name : '';
          },
          sort: true,
          sortFn: (val, item) => {
            const column = item.reflect;

            if (val == 'top') {
              this.searchCondition[column] = true;
            } else {
              this.searchCondition[column] = false;
            }
            ;

            this.getList();
          },
        }
      ],
      loading: false,
      showIndex: true
    };

    this.getList();
  };

  totalSize: number;

  getList() {
    let data = this.searchModel;
    let eTime = DateObjToString((<Date>data.endTime));

    data.startTime = DateObjToString((<Date>data.startTime));
    data.endTime = eTime && eTime.indexOf(':') == -1 ? eTime + ' 23:59:59' : eTime;

    this.orderSer.getList(data)
      .pipe(
        filter((res: Response) => {
          if (res.success !== true) {
            this.msg.fetchFail(res.message);
          }
          ;

          this.tableData.loading = false;

          if (res.data && res.data['length'] === 0) {
            this.tableData.data = [];
            this.totalSize = 0;
          }
          ;

          return res.success === true && res.data && (< Array<Object>>res.data).length > 0;
        })
      )
      .subscribe(
        (res: Response) => {

          let data_arr = res.data;

          this.tableData.data = (<Array<Object> >data_arr);

          this.totalSize = res.page.totalNumber;

        }
      );
  };

  pageChange($size: number, type: string): void {
    if (type == 'size') {
      this.searchModel.pageSize = $size;
    }
    ;

    if (type == 'page') {
      this.searchModel.currentPage = $size;
    }
    ;
    this.getList();
  };

  reset() {
    this.searchModel = new SearchModel();
    this.getList();
  };

  changeStatus(status: string) {

    this.searchModel.status = status;
    this.searchModel.currentPage = 1;

    this.getList();
  };
};
