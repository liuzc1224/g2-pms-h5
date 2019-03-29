import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { locale } from './model' ;
@Injectable({
    providedIn : "root"
})
export class EnumService{
    constructor(
    ){};

    getLocale(){
        return locale ;
    };
}