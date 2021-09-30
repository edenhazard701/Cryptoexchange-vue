function NumberUtil()
{

}

NumberUtil.EPSILON = 2.2204460492503130808472633361816E-16;

NumberUtil.isNumber = function(n) 
{
	return typeof n == 'number';
};

// 더하기
NumberUtil.add = function(n0, n1, placesOfDecimals)
{
	var n = n0 + n1;
	n = Math.round(n * Math.pow(10, placesOfDecimals)) / Math.pow(10, placesOfDecimals);
	var lenDigit = NumberUtil.getLenDigit(n);
	var length = lenDigit + placesOfDecimals;
	n = NumberUtil.convertDisplayNum(n, length);
	return n;
};

// 빼기
NumberUtil.substract = function(n0, n1, placesOfDecimals)
{
	var n = n0 - n1;
	var nSub = n * Math.pow(10, placesOfDecimals);
	var strSub = nSub.toFixed( placesOfDecimals);
	n = Math.floor( parseFloat(strSub)) / Math.pow(10, placesOfDecimals);
	var lenDigit = NumberUtil.getLenDigit(n);
	var length = lenDigit + placesOfDecimals;
	n = NumberUtil.convertDisplayNum(n, length);
	return n;
};

// 곱하기
NumberUtil.multiply = function(n0, n1, placesOfDecimals, type)
{
	if(isNaN(n0) || isNaN(n1)) {
		return 0;
	}
	
	//var n = n0 * n1;
	// n = Math.round(n * Math.pow(10, placesOfDecimals)) / Math.pow(10, placesOfDecimals);
	// n = Math.trunc(n * Math.pow(10, placesOfDecimals)) / Math.pow(10, placesOfDecimals);

	// 2019.03.14 자바스크립트 소수점 이하 곱셉 에러 보정
	var n = (n0 * n1).toFixed(NumberUtil.getLenBelowDigit(n0) + NumberUtil.getLenBelowDigit(n1));
	
	if(type === 'round') {
		n = Math.round(n * Math.pow(10, placesOfDecimals)) / Math.pow(10, placesOfDecimals);
	} else {
		n = n * Math.pow(10, placesOfDecimals) / Math.pow(10, placesOfDecimals);
	}
	
	var lenDigit = NumberUtil.getLenDigit(n);
	var length = lenDigit + placesOfDecimals;
	n = NumberUtil.convertDisplayNum(n, length);
	return n;
};

// 나누기
NumberUtil.divide = function(n0, n1, placesOfDecimals)
{
	var n = n0 / n1;
	n = Math.round(n * Math.pow(10, placesOfDecimals)) / Math.pow(10, placesOfDecimals);
	var lenDigit = NumberUtil.getLenDigit(n);
	var length = lenDigit + placesOfDecimals;
	n = NumberUtil.convertDisplayNum(n, length);
	return n;
};

NumberUtil.add_Hoga = function(n, hoga, placesOfDecimals)
{
	
	if (placesOfDecimals > 0)
	{
		var result = NumberUtil.add(n, hoga, placesOfDecimals);
		return result;
	}
	
	var price = NumberUtil.add(n, hoga, placesOfDecimals);
	var priceClearUpZero = NumberUtil.clearUpZero(price, hoga, placesOfDecimals);
	return priceClearUpZero = priceClearUpZero - (priceClearUpZero % hoga);
	// return priceClearUpZero;
};

NumberUtil.substract_Hoga = function(n, hoga, placesOfDecimals)
{
	if (placesOfDecimals > 0)
	{
		var result = NumberUtil.substract(n, hoga, placesOfDecimals);
		return result;
	}
	
	var priceClearUpZero = NumberUtil.clearUpZero(n, hoga, placesOfDecimals);
	if (n != priceClearUpZero) {
		return priceClearUpZero = priceClearUpZero - (priceClearUpZero % hoga);
		// return priceClearUpZero;
	}
		
	var price = NumberUtil.substract(priceClearUpZero, hoga, placesOfDecimals);
	return price = price - (price % hoga);
	// return price;
};

// 정수일때 호가단위로 0클리어
NumberUtil.clearUpZero = function(n, hoga, placesOfDecimals)
{
	var len = NumberUtil.getLenDigit(hoga) - 1;
	var nClearUpZero = Math.floor(n / Math.pow(10, len)) * Math.pow(10, len);
	return nClearUpZero;
};

// 화면출력용 소수점 자릿수 맞춤 숫자로 변환한다.
NumberUtil.convertDisplayNum = function(n, length)
{
	var strNumWithoutLog = NumberUtil.convertLog2StrNum(n.toString());
	
	var rtnStr = '';
	var count = 1;
	for (var i = 0; i < strNumWithoutLog.length; ++i)
	{
		if (strNumWithoutLog[i] == '.')
		{
			rtnStr += strNumWithoutLog[i];
			continue;
		}
		
		if (count > length)
		{
			/*
			if (parseInt(strNumWithoutLog[count]) >= 5)
			{
				var roundOffNum = parseInt(strNumWithoutLog[count - 1]) + 1;
				rtnStr = rtnStr.slice(0, -1);
				rtnStr += roundOffNum.toString();
			}
			*/
			break;
		}
		
		rtnStr += strNumWithoutLog[i];
		++count;
	}
	
	return rtnStr;
};

// 정수부의 자릿수를 리턴한다.
NumberUtil.getLenDigit = function(n)
{
	var strN = n;
	if (NumberUtil.isNumber(n) == true)
		strN = n.toString();
		
	strN = NumberUtil.convertLog2StrNum(strN);
	
	var strInteger = '';
	for (var i = 0; i < strN.length; ++i)
	{
		if (strN[i] == '.')
		{
			return strInteger.length;
		}
		
		strInteger += strN[i];
	}
	
	return strN.length;
};

// 소수점이하의 자릿수를 리턴한다.
NumberUtil.getLenBelowDigit = function(n)
{
	var strN = n;
	if (NumberUtil.isNumber(n) == true)
		strN = n.toString();
	
	strN = NumberUtil.convertLog2StrNum(strN);
	
	var strFloat = '';
	for (var i = strN.length - 1; i >= 0; --i)
	{
		if (strN[i] == '.')
		{
			return strFloat.length;
		}
		strFloat += strN[i];
	}
	
	return 0;
};

// 로그형태를 숫자형태의 스트링으로 변환해서 리턴한다.
NumberUtil.convertLog2StrNum = function(n)
{
	var logN = n;
	if (NumberUtil.isNumber(n) == true)
		logN = n.toString();
		
	var rtnStrNum = '0.';
	var hasBelowDigit = false;
	var startCounting = false;
	var belowCount = 0;
	var digit = '';
	var belowDigit = '';
	
	if (logN.indexOf('e') != -1 && logN.indexOf('-') != -1)
	{
		var i = 0;
		for (; i < logN.length; ++i)
		{
			if (logN[i] == 'e')
				continue;
			
			if (logN[i] == '-')
			{
				hasBelowDigit = true;
				continue;
			}
			
			if (hasBelowDigit == false)
			{
				if (logN[i] == '.')
				{
					startCounting = true;
					continue;
				}
				
				digit += logN[i];
				
				if (startCounting == true)
				{
					++belowCount;
				}
			}
			else
			{
				belowDigit += logN[i];
			}
		}
		
		var nBelowDigit = parseInt(belowDigit);
		var length = nBelowDigit - digit.length;
		if (length <= 0)
		{
			length = nBelowDigit - 1;
			belowCount = 0;
		}
		
		for (i = 0; i < nBelowDigit; ++i)
		{
			if (i < length)
			{
				rtnStrNum += '0';
			}
			else
			{
				for (var j = 0; j < belowCount; ++j)
				{
					rtnStrNum += '0';
				}
				
				rtnStrNum += digit;
				
				return rtnStrNum;
			}
		}
	}
	
	return logN;
};

// 20180605 최성필 서버에서 내려주는 단위 그대로 표시되도록 수정 >>
// String 데이터를 Double 데이터로 변환
NumberUtil.UDoubleToStr = function( data)
{
	var strResult = data.toString();
	
	var nFind = strResult.lastIndexOf( '.');
	var nPos = 0;
	if( nFind >= 0)
	{
		nPos = strResult.length - nFind - 1;

		var number = strResult.substring( 0, nFind) * 1;
		var digitStr = strResult.substring( nFind);

		strResult = number.toString() + digitStr;
	}
	else
	{
		var nResult = strResult * 1;
		strResult = nResult.toString();
	}
	
	if( strResult.length <= 0)
		strResult = '0';
	
	return StringUtil.setComma( strResult);
};

// 정수 반올림 : 소수점 첫째자리에서 정수로 표현 시 사용
NumberUtil.Round_Double = function( data)
{
	var num = data * 1;
	return Math.floor( num + 0.5);
};

NumberUtil.Divide10 = function( data, roundPosition)
{
	var value = data * 1;
	for( var nIndex = 0; nIndex < roundPosition; nIndex++)
	{
		value = data / 10;
		data = data / 10;
	}
	
	return value;
};

// 실수 반올림 : 소수점 아래의 roundPosition자리에서 반올림 : round(123.557, 2) -> 123.6
NumberUtil.Round = function( data, roundPosition)
{
	// 소수점 보정
	data *= ( 1 + NumberUtil.EPSILON * 1000);

	if( roundPosition < 0)
		return;

	// 소수점 첫째자리에서 -> 정수 표현
	if( roundPosition == 0)
		return NumberUtil.Round_Double( data);

	roundPosition++;
	var value = NumberUtil.Round_Double( data * Math.pow( 10, roundPosition - 1)) / Math.pow( 10, roundPosition - 1);	
	return value.toFixed( roundPosition - 1);
};

// 실수 버림 : 소수점 아래 floorPosition 자리 버림 : floor( 123.557, 2) -> 123.55
// floorPosition : 값이 있으면 값만큼 자르고, 아니면 호가단위별로 잘라서 처리한다.
NumberUtil.Floor = function(hogaUnit, curCd, data, floorPosition) {
	if (isNaN(data) || data == '' || data == undefined) {
		return data;
	}

	var arr = data.toString().split('.');
	if (arr.length == 1) {
		return parseInt(data);
	}

	var nLenBelowDigitArray = [];
	if (floorPosition != null && floorPosition >= 0) {
		nLenBelowDigitArray[0] = floorPosition;
	} else {
		var curprc = data * 1;
		UnitManager.getHogaUnit(hogaUnit, curCd, curprc, undefined, undefined, nLenBelowDigitArray);
	}
	
	if (nLenBelowDigitArray[0] < arr[1].length) {
		arr[1] = arr[1].substring(0, nLenBelowDigitArray[0]);
	}
	
	return parseInt(arr[0]) + '.' + arr[1];
};
// 20180605 최성필 서버에서 내려주는 단위 그대로 표시되도록 수정 <<