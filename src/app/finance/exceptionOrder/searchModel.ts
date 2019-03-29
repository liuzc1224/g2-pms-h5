export class SearchModel {
    pageNumber : any = 0;
    pageSize : number = 10 ;
    currentPage : number = 1;
    orderNo : string = '' ; 
    userPhoneNum : string = '' ; 
    userIdNo : string = '' ; 
    userName : string = '' ; 
    startTime : any = '' ; 
    endTime : any = '' ;
    transactionId : string = ''  ;
    status : string = 'null' ;
    columns : Array< String > = [] ;
    orderBy : Array< Boolean > = [] ;
}