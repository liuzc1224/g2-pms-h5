import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../../service/order';
import { filter } from 'rxjs/operators' ;
import { Response } from '../../model'
import { MsgService } from '../../../service/msg';
@Component({
    selector : "user-contact-info" ,
    templateUrl : './user-contact.component.html' ,
    styleUrls : ['./user-contact.component.less']
})

export class ContactInfoComponent implements OnInit {
    constructor(
        private userSer: UserService,
        private msg: MsgService,
    ) {};

    ngOnInit(){
        this.init()
    };

    @Input() usrId : any ;
    @Input() orderId : any ;

    init(){
        this.getData() ;
    };

    contactList : Array< Object > ;

    getData(){
        this.userSer.getOrderFriendInfo(this.usrId,this.orderId)
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
                    let data = < Array< Object > >res.data;
                    this.contactList = data.filter( item => item['contactGrade'] == 1 || item['contactGrade'] == 2 || item['contactGrade'] == 3 );
                }
            )
    };
}