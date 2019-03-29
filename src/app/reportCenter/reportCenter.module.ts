import { NgModule } from '@angular/core' ;
import { NgZorroAntdModule } from 'ng-zorro-antd' ;
import { ShareModule } from '../share/share.module' ;
import { RouterModule , Router ,Routes } from '@angular/router' ;
import { saleDataComponent } from './saleData/saleData.component';
import { userfunnelComponent } from './userfunnel/userfunnel.component';
import { channeldataComponent } from './channeldata/channeldata.component';
import { financeDataComponent } from './financeData/financeData.component';
const routes  : Routes = [
    {
        path : "saleData" ,
        component : saleDataComponent ,
        data : {
            reuse : false ,
            title : "销售数据"
        }
    },
    {
        path : "userfunnel" ,
        component : userfunnelComponent ,
        data : {
            reuse : false ,
            title : "用户转化漏斗"
        }
    },
    {
        path : "channeldata" ,
        component : channeldataComponent ,
        data : {
            reuse : false ,
            title : "渠道数据监测"
        }
    },
    {
        path : "financeData" ,
        component : financeDataComponent ,
        data : {
            reuse : false ,
            title : "财务数据"
        }
    }
];

const component = [
    saleDataComponent ,
    userfunnelComponent ,
    channeldataComponent ,
    financeDataComponent ,
];

@NgModule({
	declarations : [
		...component
	],
	imports: [
		ShareModule,
		NgZorroAntdModule,
		RouterModule.forChild(routes)
	],
	providers: [],
	bootstrap: []
})
export class ReportCenterModule{ };