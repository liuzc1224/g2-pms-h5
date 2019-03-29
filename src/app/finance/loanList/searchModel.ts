export class SearchModel {
    pageNumber : any = 0;
    pageSize : number = 10 ;
    currentPage : number = 1;
    status : string  = 'null' ;
    orderNo : string = '';
    userName :string = '';
    bankName : string = '' ;
    bankCardNum : string = '' ;
    phoneNumber : string ='' ;
    startTime : any = '' ; 
    endTime : any = '' ;
    columns : Array< String > = [] ;
    orderBy : Array< Boolean > = [] ;
};
