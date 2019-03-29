export class SearchModel {
    pageNumber : any = 0;
    pageSize : number = 10 ;
    currentPage : number = 1;
    // status : string = '1,2,9,12';
    status : string = '1,2,3,4,6,9,12,13';
    startTime : any ;
    endTime : any ;
    orderNo : any ;
    userPhoneNum : any ;
    columns : Array< String > = [] ;
    orderBy : Array< Boolean > = [] ;
};