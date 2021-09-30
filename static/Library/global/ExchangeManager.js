
////////////////////////////////////////////////////////////////////////////////////////////////////////
// 코인주문에서 다른 페이지에 중복 사용하는 데이타를 저장하는 싱글톤 클래스
// Created by codebreaker
//
// Revision History
// Created 2017-11-22

// 매수매도구분
var OrderBuySellType =
{
	otBuy: 1,
	otSell: 2
};

// 주문호가유형
var OrderCode = 
{
	// 시장가
	opcMarket: 1,
	// 지정가
	opcStop: 2,
	// 최유리 지정가
	opcBest: 3,
	// 최우선 지정가
	opcFirst: 4,
	// 조건부 지정가
	opcCondition: 5	
};

// 자동매매주문구분
var AutoOrderCode = 
{
	// 일반주문
	aocNormal: 0,
	// 자동주문
	aocAuto: 1
};

// 거래구분
var OrderType =
{
	otNormal: 1,
	otMargin: 2,
	otAuto: 3,
	otMarginLiquidate: 4
};

// 마진거래 구분
var MrgnTrdTp =
{
	mttNormal: 0,
	mttMrgnNew: 1,
	mttMrgnLiquidation: 2
};

/**
Constructor
Do not call Function in Constructor.
*/
function ExchangeManager()
{
	///////////////////////////////////////////////////////////////////////////////
	// getter, setter 목록
	// 종목코드
	this.symbol = null;
	// 매수매도호가타입
	this.sellBuyOrderType = OrderCode.opcStop;
	// 현재 가격
	this.currentPrice = 0;
	// 총 매도 잔량
	this.askTotal = 0;
	// 총 매수 잔량
	this.bidTotal = 0;
	// 매매기준율
	this.trdBssRate = 0;	
	// 지불통화
	this.paycurrcode = 'KRW';
	// 매수주문가능금액
	this.buyOrderAbleAmount = 0;
	// 매수주문가능수량
	this.buyOrderAbleQuantity = 0;
	// 매도주문가능수량
	this.sellOrderAbleQuantity = 0;
	// 일반 주문의 호가단위, KRW는 무조건 1 단위
	this.orderUnit =
	[
		[10000000, 1000000000000, 10000],
		[1000000, 10000000, 1000],
		[100000, 1000000, 100],
		[10000, 100000, 10],
		[1000, 10000, 1],
		[100, 1000, 0.1],
		[10, 100, 0.01],
		[1, 10, 0.001],
		[0.1, 1, 0.0001],
		[0.01, 0.1, 0.00001],
		[0.001, 0.01, 0.000001],
		[0.0001, 0.001, 0.0000001],
		[0.00001, 0.0001, 0.00000001],
		[0.000001, 0.00001, 0.00000001],
		[0.0000001, 0.000001, 0.00000001],
		[0.00000001, 0.0000001, 0.00000001]
	];
	this.orderUnitStr = 
	[
		['10000000', '1000000000000', '10000'],
		['1000000', '10000000', '1000'],
		['100000', '1000000', '100'],
		['10000', '100000', '10'],
		['1000', '10000', '1'],
		['100', '1000', '0.1'],
		['10', '100', '0.01'],
		['1', '10', '0.001'],
		['0.1', '1', '0.0001'],
		['0.01', '0.1', '0.00001'],
		['0.001', '0.01', '0.000001'],
		['0.0001', '0.001', '0.0000001'],
		['0.00001', '0.0001', '0.00000001'],
		['0.000001', '0.00001', '0.00000001'],
		['0.0000001', '0.000001', '0.00000001'],
		['0.00000001', '0.0000001', '0.00000001']
	];
	// 코인간의 거래에서 사용하는 코인의 주문 단위
	this.coinOrderUnit =
	[
		{ Name: 'BTC', Unit: 0.0001 },
		{ Name: 'ETH', Unit: 0.001 },
		{ Name: 'DASH', Unit: 0.001 },
		{ Name: 'LTC', Unit: 0.01 },
		{ Name: 'ETC', Unit: 0.01 },
		{ Name: 'XRP', Unit: 1 },
		{ Name: 'BCH', Unit: 0.0001 },
		{ Name: 'XMR', Unit: 0.001 },
		{ Name: 'EOS', Unit: 0.01 },
		{ Name: 'BTG', Unit: 0.001 },
		{ Name: 'QTUM', Unit: 0.01 },
		{ Name: 'ZEC', Unit: 0.001 }
	];
}

ExchangeManager.instance = null;
ExchangeManager.getInstance = function()
{
	if (!ExchangeManager.instance)
		ExchangeManager.instance = new ExchangeManager();
	return ExchangeManager.instance;
};

// 서버 무조건 2000건 기준
// 직접접근 가능한 getter
// 협의된 미체결 조회 요청 건수
ExchangeManager.maxTr102ReqCnt = 100;
// 체결 조회 요청 건수, 조회일수대비 건수가 많더라도 무조건 맥스 100건으로 협의
ExchangeManager.maxTr103ReqCnt = 100;
ExchangeManager.maxReqCnt = 100;
// 유효하지 않은 수
ExchangeManager.invalidNo = -1;

ExchangeManager.prototype.setSymbol = function(symbol)
{
	this.symbol = symbol;
};

ExchangeManager.prototype.getSymbol = function()
{
	return this.symbol;
};

ExchangeManager.prototype.setSellBuyOrderType = function(orderCode)
{
	this.sellBuyOrderType = orderCode;
};

ExchangeManager.prototype.getSellBuyOrderType = function()
{
	return this.sellBuyOrderType;
};

ExchangeManager.prototype.setCurrentPrice = function(curPrice)
{
	if (isNaN(curPrice) || curPrice == '')
	{
		this.currentPrice = 0;
		return;
	}

	this.currentPrice = curPrice;
};

ExchangeManager.prototype.getCurrentPrice = function()
{
	return this.currentPrice;
};

ExchangeManager.prototype.setAskTotal = function(askTotal)
{
	this.askTotal = askTotal;
};

ExchangeManager.prototype.getAskTotal = function()
{
	return this.askTotal;
};

ExchangeManager.prototype.setBidTotal = function(bidTotal)
{
	this.bidTotal = bidTotal;
};

ExchangeManager.prototype.getBidTotal = function()
{
	return this.bidTotal;
};

ExchangeManager.prototype.setTradeBaseRate = function(trdBssRate)
{
	this.trdBssRate = trdBssRate;
};

ExchangeManager.prototype.getTradeBaseRate = function()
{
	return this.trdBssRate;
};

ExchangeManager.prototype.setPayCurCode = function(paycurrcode)
{
	this.paycurrcode = paycurrcode;
};

ExchangeManager.prototype.getPayCurCode = function()
{
	return this.paycurrcode;
};

// 매수주문가능금액
ExchangeManager.prototype.setBuyOrderAbleAmount = function(buyOrderAbleAmount)
{
	this.buyOrderAbleAmount = buyOrderAbleAmount;
};

// 매수주문가능금액
ExchangeManager.prototype.getBuyOrderAbleAmount = function()
{
	return this.buyOrderAbleAmount;
};

// 매수주문가능수량
ExchangeManager.prototype.setBuyOrderAbleQuantity = function(buyOrdAbleQty)
{
	this.buyOrderAbleQuantity = buyOrdAbleQty;
};

// 매수주문가능수량
ExchangeManager.prototype.getBuyOrderAbleQuantity = function()
{
	return this.buyOrderAbleQuantity;
};

// 매도주문가능수량
ExchangeManager.prototype.setSellOrderAbleQuantity = function(sellOrderAbleQuantity)
{
	this.sellOrderAbleQuantity = sellOrderAbleQuantity;
};

// 매도주문가능수량
ExchangeManager.prototype.getSellOrderAbleQuantity = function()
{
	return this.sellOrderAbleQuantity;
};

ExchangeManager.prototype.getOrderUnit = function(curCode, currPrice)
{
	if (currPrice == undefined)
		currPrice = ExchangeManager.invalidNo;
		
	if (currPrice == ExchangeManager.invalidNo)
	{
		if (this.currentPrice == 0)
			return currPrice;
			
		currPrice = this.currentPrice;
	}
	
	var coinOrderUnitLength = this.coinOrderUnit.length;
	for (var index = 0; index < coinOrderUnitLength; ++index)
	{
		if (this.coinOrderUnit[index].Name == curCode)
		{
			return this.coinOrderUnit[index].Unit;
		}
	}
	
	var length = this.orderUnit.length;
	for (var i = 0; i < length; ++i)
	{
		if (this.orderUnit[i][0] <= currPrice && this.orderUnit[i][1] > currPrice)
		{
			if (this.orderUnit[i][2] < 1)
			{
				if (curCode == 'KRW')
				{
					return 1;
				}
			}
			
			return this.orderUnit[i][2];
		}
	}
	
	if (curCode == 'KRW')
	{
		return 1;
	}
	
	return ExchangeManager.invalidNo;
};

ExchangeManager.prototype.getOrderUnitPrice = function(curCode, currPrice)
{
	/*
	var call,
		currPrice = currPrice || ExchangeManager.invalidNo;
	
	var length = this.orderUnit.length;
	for (var i = 0; i < length; ++i)
	{
		if (this.orderUnit[i][0] <= currPrice && this.orderUnit[i][1] > currPrice)
		{
			call = this.orderUnit[i][2];
			break;
		}
	}
	*/
	
	if(typeof currPrice != "number") currPrice = currPrice*1;
	
	//return parseInt(currPrice, 10);
	var nLenBelowDigitArray = [1];
	UnitManager.getHogaUnit(curCode, currPrice, undefined, undefined, nLenBelowDigitArray);
	if(nLenBelowDigitArray[0] == 0)
		return parseInt(currPrice, 10);
	else
		return currPrice.toFixed(nLenBelowDigitArray[0]);

	/*
	if(!call || call == ExchangeManager.invalidNo || call.toString().indexOf('.')<0)
	{
		return parseInt(currPrice, 10);
	}
	else
	{
		var fix = call.toString().split('.')[1].length;
		var digits = Math.pow(10, fix);
		return parseFloat(FloatUtil.divide(parseInt(FloatUtil.multiply(currPrice, digits), 10), digits)).toFixed(fix);
	}
	*/
};

ExchangeManager.prototype.getOrderUnitPriceStr = function(curCode, currPrice)
{
	var call;
	
	if(currPrice == undefined) currPrice = ExchangeManager.invalidNo;
	
	var length = this.orderUnitStr.length;
	for (var i = 0; i < length; ++i)
	{
		if (this.orderUnitStr[i][0] <= currPrice && this.orderUnitStr[i][1] > currPrice)
		{
			call = this.orderUnitStr[i][2];
			break;
		}
	}
	
	if (call < 1 && curCode == 'KRW')
	{
		call = 1;
	}
	
	if(!call || call == ExchangeManager.invalidNo || call.toString().indexOf('.')<0)
	{
		return parseInt(currPrice, 10);
	}
	else
	{
		var fix = call.toString().split('.')[1].length;
		var digits = Math.pow(10, fix);
		return parseFloat(parseInt(currPrice*digits, 10)/digits).toFixed(fix);
	}
};


// 코인간 거래에서 사용하는 코인의 주문 단위 수량 리턴
ExchangeManager.prototype.getCoinOrderUnit = function(curCode)
{
	var length = this.coinOrderUnit.length;
	for (var index = 0; index < length; ++index)
	{
		if (this.coinOrderUnit[index].Name == curCode)
		{
			return this.coinOrderUnit[index].Unit;
		}
	}
};

ExchangeManager.prototype.getCoinOrderUnitQty = function(symbol, curQty)
{
	var call = 0.0001;
	var length = this.coinOrderUnit.length;
	if(symbol) call = UnitManager.getQty_OrdUnit(symbol);
	
	if(call == 1)
	{
		return parseInt(curQty, 10);
	}
	else
	{
		// 20180521 최성필 BTC, ETH 마켓 추가 >>
		// 호가단위가 정수이고, 10 or 100 등 단위일 경우에 대한 예외처리
//		var fix = call.toString().split('.')[1].length;
		var fix;
		var isData = call.toString().split('.')[1];
		if( isNaN( isData))
		{
			return parseInt( curQty, 10);
		}
		else
			fix = call.toString().split('.')[1].length;
		// 20180521 최성필 BTC, ETH 마켓 추가 <<
		var digits = Math.pow(10, fix);
		return parseFloat(FloatUtil.divide(parseInt(FloatUtil.multiply(curQty, digits), 10), digits)).toFixed(fix);
	}
};
