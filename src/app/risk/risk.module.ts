import { NgModule } from '@angular/core' ;
import { NgZorroAntdModule } from 'ng-zorro-antd' ;
import { ShareModule } from '../share/share.module' ;
import { RouterModule , Router ,Routes } from '@angular/router' ;
import { riskListComponent } from './riskList/riskList.component';
import { setSysComponent } from './setSys/setSys.component';
const routes  : Routes = [
    {
        path : "list" ,
        component : riskListComponent ,
        data : {
            reuse : true ,
            title : "风控列表"
        }
    },
	{
        path : "setSys" ,
        component : setSysComponent ,
        data : {
            reuse : false ,
            title : "业务参数配置"
        }
    }
];

const component = [
	riskListComponent ,
	setSysComponent ,
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
export class RiskModule{ };