import { environment } from '../../environments/environment';
const host = environment.host ;
const system = {
	depart : {
		list : host + "/department/tree" ,
		opera : host + "/department"
	}  ,
	login : host + '/employee/login' ,
	loginMenu :  host + "/menu/tree" ,
	menu : host + "/menu" ,
	role : host + "/role" ,
	staff : host + "/employee" ,
};

const usr = {
	"list" : host + "/user/list" ,
	login :  {
		info : host + "/user/login/recently" ,
		all :host + "/user/login"
	}
};

const finance = {
	loanList : host + "/finance/payment/list" ,
	repayList : host + "/finance/repayment/list",
	tableDetail:host+"/finance/payment/flowing",
	loan : {
		loan : host + "/finance/payment/loan" ,
	},
	repay : {
		repay : host + "/finance/repayment" ,
		revokeFlowing:host + "/finance/repayment/operationRegresses"
	},
	exceptionOrderLoanList:host+"/abnormal/payout",
	exceptionOrderRepayList:host+"/abnormal/charge",
	excelExportLoan:host+"/abnormal/exportPayout",
	excelExportRepay:host+"/abnormal/exportCharge"
};

const risk = {
	riskList : host + "/risk/done",//风控列表
	workIncome : host + "/user/work",//控制收入证明开关
	compare : host + "/face/compare",//控制活体开关
};

const order = {
	user : {
		basicInfo : host + "/user/info" ,
		accountInfo : host + "/account/debt",
		auth : host + "/user/detail/image",
		userInfo : host + "/user/login/recently",
		baseInfo : host + "/user/detail/info",
		familyInfo : host + "/user/family",
		workInfo : host + "/user/work",
		friendInfo : host + "/user/contact" ,
		bankInfo : host + "/account/bankcard" ,
		orderAuth : host + "/user/order/detail/image",
		orderUserInfo : host + "/user/order/login/recently",
		orderBaseInfo : host + "/user/order/detail/info",
		orderFamilyInfo : host + "/user/order/family",
		orderWorkInfo : host + "/user/order/work",
		orderFriendInfo : host + "/user/order/contact" ,
		orderHisList : host + "/order/history" ,
		feceInfo : host + "/user/face/verifyInfo" ,
		authentication : host + "/user/authentication" ,
	},
	loanRecord : {
		detail : host + "/order/detail",
		orderQuery : host + "/order/query"
	} ,
	list : {
		all : host + "/order/query" ,
		detail :host + "/order/detail"
	},
	operate : {
		risk : {
			audit : host + "/risk/audit" ,
			duration : host + "/user/behavior/pageDuration"
		},
		reback : host + "/risk/recall"
	} ,
	record : {
		risk : host + "/risk/audit/record" ,
		payment : host + "/finance/payment/list" ,
		loan : host + "/finance/payment/loan/list" ,
		repayment : host + "/finance/repayment/list" ,
		repaymentRecord : host + "/finance/repayment/record"
	}
};
const defaultIndex = {
	history : host + "/statistics/history" ,
	today : host + "/statistics/today" ,
	lastest: host + "/statistics/day/seven",
	refreshToday: host + "/statistics/today/refresh"
}

const bank = {
	list :host +"/support/bank" ,
	add :host + "/support/bank/save" ,
	update :host +"/support/bank/update" ,
	delete : host +"/support/bank"
};

const coupon={
  list:host+"/coupon/getCouponList",
  delete: host+"/coupon",
  addCoupon:host+"/coupon/addCoupon",
  getCoupon:host+"/coupon/getCoupon",
  push:host+"/coupon/pushMessage",
  pauseButton:host+"/coupon/updatePauseButton",
  update:host+"/coupon/updateCoupon"
};
const channel={
  getList:host+"/channel",
  update:host+"/channel",
  addChannel:host+"/channel",
  channelBranch:{
    getChannelBranch:host+"/channel/branch",
    addChannelBranch:host+"/channel/branch",
    invitationCode:host+"/channel/branch/invitationCode",
    unUsedQuantity:host+"//channel/branch/invitationCode/unUsedQuantity",
    update:host+"/channel/branch",
    export:host+"/channel/branch/export",
    import:host+"/channel/branch/import",
    generate:host+"/channel/branch/invitationCode/generate"
  },
  channelH5:{
    getChannelH5:host+"/channel/h5",
    addChannelH5:host+"/channel/h5",
    update:host+"/channel/h5",
  }
};

const reportCenter = {
  channelData:host+"/statistics/channel/invitationCode",
  channelExport:host+"/statistics/channel/invitationCode/export",
  channelH5Export:host+"/statistics/channel/h5/export",
  channelDataH5:host+"/statistics/channel/h5",
	sellDay : host + "/statistics/data/sell/day" ,
	sellDayHistory : host + "/statistics/data/sell/history" ,
	financeDay : host + "/statistics/data/finance/day" ,
	financeHistory : host + "/statistics/data/finance/history",
	transformList : host + "/statistics/data/transform/list"
};

export const GLOBAL = {
	API : {
		system :system,
		usr : usr ,
		finance : finance ,
		risk : risk,
		order : order ,
		default : defaultIndex ,
		bank : bank ,
		reportCenter : reportCenter,
    coupon:coupon,
    channel:channel
	},
	rights : "@copyright 2018 xxx"
};
