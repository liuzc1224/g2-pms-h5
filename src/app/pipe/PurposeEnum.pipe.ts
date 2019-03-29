import { Pipe, PipeTransform } from '@angular/core';
import { purposetransform } from '../format';
@Pipe({
    name: 'PurposePipe'
})
export class PurposePipe implements PipeTransform {
    constructor(

    ) { }

    transform(value: any): any {

        return purposetransform(value);
    };
};