import { Pipe, PipeTransform } from '@angular/core';
import { dataFormat } from '../format/dateFormat';
import { sextransform } from '../format';
import { SessionStorageService } from '../service/storage';

@Pipe({
    name: 'OrderStatusPipe'
})
export class OrderStatusPipe implements PipeTransform {
    constructor(
        private sgo : SessionStorageService
    ) { }

    transform(value: any): any {

        let EduLangEnum = this.sgo.get("lang")['common']['orderStatus'];

        let val = EduLangEnum.find(item => {
            return item.value == value;
        });

        if(val){
            return val.desc
        }else{
            return "no";
        };
    };
};