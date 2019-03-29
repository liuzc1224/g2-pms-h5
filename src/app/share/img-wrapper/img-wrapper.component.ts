import { Component, Input, OnInit } from '@angular/core';

declare var $ : any ;
@Component({
    selector : 'img-wrapper' ,
    templateUrl : './img-wrapper.html' ,
    styleUrls : [ './img-wrapper.less']
})

export class  ImgWrapperComponent implements  OnInit{
    ngOnInit(){
        $("[data-magnify=gallery]").magnify();
    };

    constructor(){

    };

    @Input() title : string = '' ;
    @Input() imgUrl : { minify? : string , large : string } ;

    imgLoadComplete($event){
        this.imgLoadCompleteMark = false ;
    };

    imgLoadCompleteMark : boolean = true ;
};