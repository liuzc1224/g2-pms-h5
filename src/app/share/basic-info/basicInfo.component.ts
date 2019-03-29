import { Component , OnInit , Input, Output } from '@angular/core';
import { UserService } from '../../service/order' ;
import { filter } from 'rxjs/operators';
import { CommonMsgService } from '../../service/msg'
import { Response } from '../model';
@Component({
    selector :"basic-info" ,
    templateUrl : "./basicInfo.component.html" ,
    styleUrls : ["./basicInfo.component.less"]
})
export class BasicInfoComponent implements OnInit{
    constructor(
        private usrSer : UserService ,
        private msg : CommonMsgService
    ){};

    ngOnInit(){
    };

    getData(usrId : number){
        this.usrSer.getBasicInfo(usrId)
            .pipe(
                filter( (res : Response) => {
                    if(res.success === false){
                        this.msg.fetchFail(res.message) ;
                    };

                    return res.success === true ;
                })
            )
            .subscribe(
                (res : Response ) => {
                    this.userInfo = res.data ;
                }
            )
    };

    userInfo : Object ;
};
