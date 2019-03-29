import { Pipe, PipeTransform } from '@angular/core';
import { adrTypetransform } from '../format';
@Pipe({
    name: 'AdrTypePipe'
})
export class AdrTypePipe implements PipeTransform {
    constructor(

    ) { }

    transform(value: any): any {
        return adrTypetransform(value);
    };
};