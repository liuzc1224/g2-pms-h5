import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../../service/order';
import { filter } from 'rxjs/operators' ;
import { Response } from '../../model';
import { MsgService } from '../../../service/msg';

declare var $ : any;
@Component({
    selector : "user-family-info" ,
    templateUrl : './familyInfo.component.html' ,
    styleUrls : ['./familyInfo.component.less']
})

export class FamilyInfoComponent implements OnInit {
    constructor(
        private userSer: UserService,
        private msg: MsgService,
    ) {};

    ngOnInit(){
        this.init()
    };

    @Input() usrId : any ;
    @Input() orderId : any ;
    @Input() familyInfo : object ;

    init(){

    };



    showImg(index){
        $("[data-magnify=gallery]")[index].click();
    }
}