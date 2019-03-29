import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';


import { TableComponent } from './table/table.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import {
    SessionStorageService ,
    LocalStorageService
} from '../service/storage' ;


import {
    DefaultComponent ,
    LayoutComponent ,
    SideMenuComponent,
    TagNavComponent,
} from '../layout' ;

import { nullPipe , dateFormatPipe , EduPipe , SexPipe , MarryPipe  , SecondsPipe , StatusPipe , PayTypePipe , paymentResult,OrderStatusPipe , IncomeSourcePipe, AdrTypePipe, PurposePipe } from '../pipe' ;

import { LoginComponent } from '../login/login.component';

import { RecordComponent } from '../record/record/record.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { LoginInterceptor } from '../interceptor.service';

import { BasicInfoComponent } from './basic-info/basicInfo.component';

import { ApproveComponent } from './approve/approve.component' ;

import { AuthComponent } from './auth/auth.component'

import { UsrAuthComponent } from '../usr/auth/auth.component';

import { ImgWrapperComponent } from './img-wrapper/img-wrapper.component' ;

import { UserInfoLocationComponent } from './user-info/location/location.component';
import { UserInfoBasicComponent } from './user-info/basic-info/basic-info.component';
import { FamilyInfoComponent } from './user-info/family-info/familyInfo.component';
import { IncomeComponent } from './user-info/income-info/income.component';
import { ContactInfoComponent } from './user-info/user-contact/user-contact.component';
import { UserOrderInfoComponent } from './user-info/order-info/order-info.component';
import { UserOtherInfoComponent } from './user-info/other-info/other-info.component';

const commonComponents = [
    TableComponent,
    DefaultComponent,
    LayoutComponent,
    SideMenuComponent ,
    LoginComponent,
    TagNavComponent ,
    BasicInfoComponent ,
    ApproveComponent ,
    AuthComponent,
    RecordComponent ,
    UsrAuthComponent ,
    ImgWrapperComponent ,
    UserInfoLocationComponent ,
    UserInfoBasicComponent ,
    FamilyInfoComponent ,
    IncomeComponent ,
    ContactInfoComponent ,
    UserOrderInfoComponent,
    UserOtherInfoComponent
];

const pipes = [
    nullPipe ,
    dateFormatPipe ,
    EduPipe ,
    SexPipe ,
    MarryPipe ,
    SecondsPipe ,
    StatusPipe ,
    PayTypePipe ,
    paymentResult ,
    OrderStatusPipe ,
    IncomeSourcePipe ,
    AdrTypePipe ,
    PurposePipe
];

const services = [
    SessionStorageService ,
    LocalStorageService ,
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,
        NgZorroAntdModule ,
        TranslateModule
    ],
    declarations: [
        ...commonComponents,
        ...pipes
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        ...commonComponents,
        NgZorroAntdModule,
        ...pipes ,
        TranslateModule

    ],
    providers: [
        ...services,
        {provide: HTTP_INTERCEPTORS, useClass: LoginInterceptor, multi: true}
    ]
})
export class ShareModule {
}
