interface LoanPurposeModel {
    name : any ;
    value : any ;
}
export class LoanPurposeClass {
    get( locale : string ){
        return this[locale] ? this[locale] : this['ex_MX'] ;
    };

    private 'zh_CN' : Array< LoanPurposeModel > = [
        {
            name : "教育/学费/学校用品/制服等" ,
            value : '1'
        },{
            name : "购买电子设备" ,
            value : "2"
        },{
            name : "购买礼物" ,
            value : "3"
        },{
            name : "娱乐消费/电影/音乐会等" ,
            value : "4"
        },{
            name : "家庭聚会等" ,
            value : '5'
        },{
            name : "出行工具/汽车/摩托车等" ,
            value : "6"
        },{
            name : "维修/护理费用" ,
            value : "7"
        },{
            name : "医疗/药物费用" ,
            value : "8"
        },{
            name : "偿还债务" ,
            value : "9"
        },{
            name : "生活缴费/水电" ,
            value : '10'
        },{
            name : "住房租金" ,
            value : '11'
        },{
            name : "生意" ,
            value : '12'
        },{
            name : "理财" ,
            value : '13'
        },{
            name : "服饰包包" ,
            value : '14'
        },{
            name : "旅行/度假" ,
            value : '15'
        }
    ];

    private 'ex_MX' : Array< LoanPurposeModel > = [
        {
            name : "Educación/Matrícula/Útiles escolares/Uniformes, etc" ,
            value : '1'
        },{
            name : "Comprar equipos electrónicos" ,
            value : "2"
        },{
            name : "Comprar regalos" ,
            value : "3"
        },{
            name : "Consumo de entretenimiento/Películas/Conciertos, etc." ,
            value : "4"
        },{
            name : "Reunión familiar, etc." ,
            value : '5'
        },{
            name : "Herramientas de viaje/Automóviles/Motocicletas, etc." ,
            value : "6"
        },{
            name : "Costos de reparación/Cuidado" ,
            value : "7"
        },{
            name : "Gastos médicos/Médicos" ,
            value : "8"
        },{
            name : "Reembolsar la deuda" ,
            value : "9"
        },{
            name : "Pago de vida/Energía hidroeléctrica" ,
            value : '10'
        },{
            name : "Alquiler vivienda" ,
            value : '11'
        },{
            name : "Negocios" ,
            value : '12'
        },{
            name : "Finanzas" ,
            value : '13'
        },{
            name : "Ropas/Bolsas" ,
            value : '14'
        },{
            name : "Viaje/Vacaciones" ,
            value : '15'
        }
    ]
}