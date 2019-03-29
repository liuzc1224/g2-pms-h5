import { NgModule } from '@angular/core';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ShareModule } from '../share/share.module';
import { RouterModule, Router, Routes , CanDeactivate } from '@angular/router';
import { ListComponent } from './list/list.component'
import { DetailComponent } from './detail/detail.component';
import { UsrAuthComponent } from './auth/auth.component'

const routes: Routes = [
	{
		path: "list",
		component: ListComponent,
		data: {
			reuse: true,
			title: "用户列表"
		},
	},{
		path: "detail",
		component: DetailComponent,
		data: {
			reuse : false ,
			title : "详情"
		}

	},{
		path : "auth" ,
		component : UsrAuthComponent , 
		data : {
			reuse : false , 
			title : "用户详情"
		}
	}
];

const component = [
	ListComponent,
	DetailComponent
];

@NgModule({
	declarations: [
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
export class UsrModule { };

