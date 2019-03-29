export class SearchModel {
    pageNumber : any = 0;
    pageSize : number = 10 ;
    currentPage : number = 1;
    phoneNumber : string = '' ; 
    username : string = '' ;
    idNumber : string = '' ;
    registerTimeStart : any = '' ;
    registerTimeEnd : any = '' ;
    columns : Array< String > = [] ;
    orderBy : Array< Boolean > = [] ;
}