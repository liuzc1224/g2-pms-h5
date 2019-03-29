import { dataFormat } from '../../format';
export const ObjToArray = ( obj : Object) =>{

    const keys = [] ;
    const vals = [] ;

    for(let key in obj){
        keys.push(key) ;
        vals.push(obj[key]) ;
    };
    return {
        keys : keys ,
        vals : vals
    };
};

export const DateToStamp = ( dateString : string ) => {

    if (dateString) {
        const date = new Date(dateString);
        return date.getTime();
    }else{
        return ''
    }
}

export const GetNow = ( isTimeStamp : boolean ) => {

    if (isTimeStamp) {
        const date = new Date();
        return date.getTime();
    }else{
        const date =  new Date().getTime() + '';
        return dataFormat(date)
    }
}