import { Pipe, PipeTransform } from '@angular/core';
import { dataFormat } from '../format/dateFormat';
import { SessionStorageService } from '../service/storage';

@Pipe({
  name: 'StatusPipe'
})
export class StatusPipe implements PipeTransform {
    constructor(
        private sgo : SessionStorageService
    ){}

    transform( value: any ): any {

        let EduLangEnum = this.sgo.get("lang")['orderList']['allList']['status'] ;

        let val = EduLangEnum.find( item => {
            return item.value == value ;
        });

        return (val && val.name) || "未知状态" ;
    };
};