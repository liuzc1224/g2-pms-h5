export class SearchModel {
  name:String="";
  serialNumber:Number=null;

  pageSize : Number = 10 ;
  currentPage : Number = 1;
  columns : Array< String > = [] ;
  orderBy : Array< Boolean > = [] ;
}
