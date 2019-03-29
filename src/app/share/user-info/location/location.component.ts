import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../../service/order';
import { filter } from 'rxjs/operators' ;
import { Response } from '../../model'
import { MsgService } from '../../../service/msg';
import { ToolService } from '../../../service/tools/tool' ;
@Component({
    selector : "user-info-location" ,
    templateUrl : './location.component.html' ,
    styleUrls : ['./location.component.less']
})

export class UserInfoLocationComponent implements OnInit {
    constructor(
        private userSer : UserService ,
        private msg : MsgService ,
        private toolService : ToolService
    ){};

    ngOnInit(){
        this.init() ;
    };

    @Input() usrId : any ;

    init(){
        this.getData() ;
    };

    locationInfo : Object ;

    getData(){
        this.userSer.getUserLoginInfo(this.usrId)
            .pipe(
                filter(
                    ( res : Response ) => {

                        if(res.success === false){
                            this.msg.error(res.message) ;
                        };

                        return res.success === true && res.data != null;
                    }
                )
            )
            .subscribe(
                (res : Response ) => {
                    this.locationInfo = res.data ;
                }
            )
    };

    getIpLocate(ip :string ){
        this.toolService.ipLocate(ip);
    };

    getlocation(lat : string , lng : string ){
        this.toolService.location(lat,lng) ;
    }
};