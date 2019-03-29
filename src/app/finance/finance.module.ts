import { NgModule } from '@angular/core' ;
import { NgZorroAntdModule } from 'ng-zorro-antd' ;
import { ShareModule } from '../share/share.module' ;
import { RouterModule , Router ,Routes } from '@angular/router' ;
import { LoanListComponent } from './loanList/loanList.component' ;
import { RepayComponent } from './repay/repay.component' ;
import { exceptionOrder } from './exceptionOrder/exceptionOrder.component' ;
const routes  : Routes = [
    {
        path : "loanList" ,
        component : LoanListComponent ,
        data : {
            reuse : true ,
            title : "Administración de prestar"
        }
    },{
		path : "repayList" ,
		component : RepayComponent ,
		data : {
			reuse : true ,
			title : "Administración de pagar"
		}
	},{
		path:"exceptionOrder",
		component:exceptionOrder,
		data:{
			resue:true,
			title:"异常订单处理"
		}
	}
];

const component = [
	LoanListComponent ,
	RepayComponent,
	exceptionOrder
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
export class FinanceModule{ };