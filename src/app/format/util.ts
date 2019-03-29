import { SessionStorageService } from '../service/storage';
import { LoanPurposeClass } from '../service/order/loanPurposeModel/loanPurpose.model' ;
let sgo = new SessionStorageService;

export const sextransform = (value: any): any => {

    let EduLangEnum = sgo.get("lang")['enums']['sex'];
    console.log(EduLangEnum);

    let val = EduLangEnum.find(item => {
        return item.value == value;
    });

    return (val && val.name) || "no";
};

export const edutransform = (value: any): any => {

    let EduLangEnum = sgo.get("lang")['enums']['degree'];

    let val = EduLangEnum.find(item => {
        return item.value == value;
    });

    return (val && val.name) || "no";
};

export const marraytransform = (value: any): any => {

    let EduLangEnum = sgo.get("lang")['enums']['marray'];

    let val = EduLangEnum.find(item => {
        return item.value == value;
    });

    return (val && val.name) || "no";
};

export const workfromtransform = (value: any): any => {

    let EduLangEnum = sgo.get("lang")['enums']['incomeSource'];

    let val = EduLangEnum.find(item => {
        return item.value == value;
    });

    return (val && val.name) || "no";
};

export const nulltransform = (value: any): any => {

    if (value)
        return value
    else
        return "no";
};

//订单状态
export const orderStatustransform = (value: any): any => {

    let EduLangEnum = sgo.get("lang")['common']['orderStatus'];

    let val = EduLangEnum.find( item => {
        return item.value == value ;
    });

    return (val && val.name) || "未知状态" ;
};


//住宅类型
export const adrTypetransform = (value: any): any => {

    let AdrTypeEnum = sgo.get("lang")['homeType'];
    console.log(AdrTypeEnum,'AdrTypeEnum');

    let val = AdrTypeEnum.find( item => {
        return item.value == value ;
    });

    return (val && val.name) || "no" ;
};

//借款用途
export const purposetransform = (value: any): any => {

    let model = new LoanPurposeClass()

    let enumVal = model.get(sgo.get('locale'));

    let item = enumVal.find( ele => {
        return ele.value == value ;
    });

    return (item && item.name) || "no" ;
};
