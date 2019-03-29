export const ObjToQueryString = function(obj : object) : string {
    let str = '';
    for(let keys in obj){
        if(obj[keys] !== null && obj[keys] !== 'null' && obj[keys] !== 'undefined' && obj[keys] !== undefined && obj[keys] !== "")
            str += keys + "=" + obj[keys] + "&";
    }
    str = str.substr(0,str.length-1);

    return str ;
};
