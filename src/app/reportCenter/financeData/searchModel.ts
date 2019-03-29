export class SearchModel {
    pageNumber : any = 0;
    pageSize : number = 10 ;
    currentPage : number = 1;
    startTime : any ;
    endTime : any ;
    columns : Array< String > = [] ;
    orderBy : Array< Boolean > = [] ;
};