import { Pipe, PipeTransform } from '@angular/core';
import { workfromtransform } from '../format/index' ;
@Pipe({
    name: 'IncomeSource'
})
export class IncomeSourcePipe implements PipeTransform {
    constructor(

    ) { }

    transform(value: any): any {

        return workfromtransform(value);
    };
};