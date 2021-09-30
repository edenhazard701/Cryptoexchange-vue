/**
Constructor
Do not call Function in Constructor.
*/
function StringUtil()
{

}

////////////////////////////////////////////////////////////////////
// Func: hasSpecialChar
// Desc: 특수문자가 포함되어 있는지 확인
// Param: text 대상문자
// Rtn: 포함되어 있으면 true
StringUtil.hasSpecialChar = function(text)
{
	var stringRegx = /[~!@\#$%<>^&*\()\-=+_\’]/gi;
	return stringRegx.test(text);
};

////////////////////////////////////////////////////////////////////
// Func: hasHanguil
// Desc: 한글이 포함되어 있는지 확인
// Param: text 대상문자
// Rtn: 포함되어 있으면 true
StringUtil.hasHanguil = function(text)
{
	var hanguilRegx = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/gi;
	return hanguilRegx.test(text);
};

////////////////////////////////////////////////////////////////////
// Func: hasAlphabet
// Desc: 영문이 포함되어 있는지 확인
// Param: text 대상문자
// Rtn: 포함되어 있으면 true
StringUtil.hasAlphabet = function(text)
{
	var alphabetRegx = /[a-z | A-Z]/gi;
	return alphabetRegx.test(text);
};

////////////////////////////////////////////////////////////////////
// Func: hasUpperLowerAlphabet
// Desc: 대문자 영문이 포함되어 있는지 확인
// Param: text 대상문자
// Rtn: 전부 포함되어 있으면 true
StringUtil.hasUpperAlphabet = function(text)
{
	var alphabetUpperRegx = /[A-Z]/g;	
	return alphabetUpperRegx.test(text);
};

////////////////////////////////////////////////////////////////////
// Func: hasUpperLowerAlphabet
// Desc: 소문자 영문이 포함되어 있는지 확인
// Param: text 대상문자
// Rtn: 전부 포함되어 있으면 true
StringUtil.hasLowerAlphabet = function(text)
{
	var alphabetLowerRegx = /[a-z]/g;
	return alphabetLowerRegx.test(text);
};

////////////////////////////////////////////////////////////////////
// Func: hasNumber
// Desc: 숫자가 포함되어 있는지 확인
// Param: text 대상문자
// Rtn: 포함되어 있으면 true
StringUtil.hasNumber = function(text)
{
	var numberRegx = /[1-9]/gi;
	return numberRegx.test(text);
};


////////////////////////////////////////////////////////////////////
// Func: onlyNumber
// Desc: 숫자만 포함되어 있는지 확인
// Param: text 대상문자
// Rtn: 포함되어 있으면 true
StringUtil.onlyNumber = function(text)
{
	var regNumber = /^[0-9]*$/;
	return regNumber.test(text);
};


////////////////////////////////////////////////////////////////////
// Func: onlyPositiveNumber
// Desc: 양수만 포함되어 있는지 확인
// Param: text 대상문자
// Rtn: 포함되어 있으면 true
StringUtil.onlyPositiveNumber = function(text)
{
	var num_check= /^(-?)([0-9]*)(\.?)([^0-9]*)([0-9]*)([^0-9]*)/; 
	if(num_check.test(text))
	{
		
		if((parseFloat(text)>0))
		{
		return true;
		}
		else
		{
		return false;
		};
		
	}
	else
	{
		//console.log(parseFloat(text));
		return false;
	};
	
};

////////////////////////////////////////////////////////////////////
// Func: onlyPositiveFloatNumber
// Desc: 0이거나양의 실수만 포함되어 있는지 확인
// Param: text 대상문자
// Rtn: 포함되어 있으면 true
StringUtil.onlyPositiveFloatNumber = function(text)
{
	var num_check= /^(-?)([0-9]*)(\.?)([^0-9]*)([0-9]*)([^0-9]*)/; 
	if(num_check.test(text))
	{
		
		if((parseFloat(text)>=0))
		{
		return true;
		}
		else
		{
		return false;
		};
		
	}
	else
	{
		//console.log(parseFloat(text));
		return false;
	};
	
};

////////////////////////////////////////////////////////////////////
// Func: isEmailAddress
// Desc: 유효한 이메일 주소 문자열인지 확인
// Param: text 대상문자
// Rtn: 유효하면 true
StringUtil.isEmailAddress = function(text)
{
	var emailAddrRegx = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
	return emailAddrRegx.test(text);
};

////////////////////////////////////////////////////////////////////
// Func: isHandPhoneNum
// Desc: 유효한 핸드폰 번호 문자열인지 확인
// Param: text 대상문자
// Rtn: 유효하면 true
StringUtil.isHandPhoneNum = function(text)
{
	var handPhoneNumExp = /^\d{3}-\d{3,4}-\d{4}$/;
	return handPhoneNumExp.test(text);
};

////////////////////////////////////////////////////////////////////
// Func: isValidBizId
// Desc: 유효한 사업자 등록번호인지 확인
// Param: bizId, 사업자등록번호
// Rtn: 유효하면 true
StringUtil.isValidBizId = function(bizId)
{
	// bizID는 숫자만 10자리로 해서 문자열로 넘긴다. 
    var checkID = new Array(1, 3, 7, 1, 3, 7, 1, 3, 5, 1); 
    var tmpBizID, i, chkSum=0, c2, remander; 
    bizId = bizId.replace(/-/gi,''); 

    for (i=0; i<=7; i++) chkSum += checkID[i] * bizId.charAt(i); 
    c2 = "0" + (checkID[8] * bizId.charAt(8)); 
    c2 = c2.substring(c2.length - 2, c2.length); 
    chkSum += Math.floor(c2.charAt(0)) + Math.floor(c2.charAt(1)); 
    remander = (10 - (chkSum % 10)) % 10 ; 

    if (Math.floor(bizId.charAt(9)) == remander) 
		return true ;
	return false; 
};

////////////////////////////////////////////////////////////////////
// Func: getAutoHypenPhoneNumber
// Desc: 번호를 하이픈이 들어간 전화번호로 바꾸어 준다.
// Param: str 대상문자
// Rtn: 하이픈이 들어간 전화번호를 리턴
StringUtil.getAutoHypenPhoneNumber = function(str)
{
	str = str.replace(/[^0-9]/g, '');
	var tmp = '';
	if( str.length < 4){
		return str;
	}
	else if(str.length < 7)
	{
		tmp += str.substr(0, 3);
		tmp += '-';
		tmp += str.substr(3);
		return tmp;
	}
	else if(str.length < 11)
	{
		tmp += str.substr(0, 3);
		tmp += '-';
		tmp += str.substr(3, 3);
		tmp += '-';
		tmp += str.substr(6);
		return tmp;
	}
	else
	{				
		tmp += str.substr(0, 3);
		tmp += '-';
		tmp += str.substr(3, 4);
		tmp += '-';
		tmp += str.substr(7);
		return tmp;
	}
	return str;
};


////////////////////////////////////////////////////////////////////
// Func: getAutoHypenBizNumber
// Desc: 번호를 하이픈이 들어간 사업자번호로 바꾸어 준다.
// Param: str 대상문자
// Rtn: 하이픈이 들어간 사업자번호 리턴
StringUtil.getAutoHypenBizNumber = function(str)
{ 
	str = str.replace(/[^0-9]/g, '').substr(0,10);
	var tmp = '';
	if (str.length < 4) {
		return str;
	} else if (str.length < 7) {
		tmp += str.substr(0, 3);
		tmp += '-';
		tmp += str.substr(3);
		return tmp;
	} else {
		tmp += str.substr(0, 3);
		tmp += '-';
		tmp += str.substr(3, 2);
		tmp += '-';
		tmp += str.substr(5);
		return tmp;
	}
	return str;
};

////////////////////////////////////////////////////////////////////
// Func: isNullOrEmpty
// Desc: 공백인지 아닌지 확인, 할당되지 않거나 공백이면 true
// Param: text 대상문자
// Rtn: 공백이거나 할당되지 않았으면 true
StringUtil.isNullOrEmpty = function(text)
{
	if (text == null)
		return true;
	if ((typeof text == "undefined") || (text.length <= 0))
		return true;
	return false;
};

////////////////////////////////////////////////////////////////////
// Func: setComma
// Desc: 세자리수마다 콤마, 금액 등을 표기할때 사용한다.
// Param: number 대상문자
// Rtn: 콤마가 삽입된 문자 리턴
StringUtil.setComma = function(number) 
{
    // 정규표현식 : (+- 존재하거나 존재 안함, 숫자가 1개 이상), (숫자가 3개씩 반복)
    var reg = /(^[+-]?\d+)(\d{3})/;

    // 스트링변환
    number += '';
    while (reg.test(number)) {
        // replace 정규표현식으로 3자리씩 콤마 처리
        number = number.replace(reg,'$1'+','+'$2');
    }

    return number;
};

////////////////////////////////////////////////////////////////////
// Func: removeComma
// Desc: 가격 데이터( 콤마 표시가 되어있는)를 숫자로 변환
// Param: 가격 데이터( 문자열)
// Rtn: 문자 리턴
StringUtil.removeComma = function( strPrice)
{
	strPrice = String( strPrice);
	// 콤마 삭제
	strPrice = strPrice.replace(/,/g, '');
    return StringUtil.trim( strPrice);
};

////////////////////////////////////////////////////////////////////
// Func: setComma
// Desc: 가격 데이터( 콤마, '원' 표시가 되어있는)를 숫자로 변환
// Param: 가격 데이터( 문자열)
// Rtn: 숫자 리턴
StringUtil.removeCommaAndUnit = function( strPrice)
{
	strPrice = String( strPrice);
	// '원' 자르고
	strPrice = strPrice.substring( 0, strPrice.length - 1);
	// 콤마 삭제
    return parseInt( strPrice.replace(/,/g, ''));
};

////////////////////////////////////////////////////////////////////
// Func: removeCommaAndUnit2
// Desc: 가격 데이터( 콤마, 'KRW', 'BTC' 등 표시가 되어있는)를 숫자로 변환
// Param: 가격 데이터( 문자열)
// Rtn: 문자 리턴
StringUtil.removeCommaAndUnit2 = function( strPrice)
{
	strPrice = String( strPrice);
	// 'KRW', 'BTC' 등을 자르고
	strPrice = strPrice.substring( 0, strPrice.length - 3);
	// 콤마 삭제
	strPrice = strPrice.replace(/,/g, '');
    return StringUtil.trim( strPrice);
};

////////////////////////////////////////////////////////////////////
// Func: insertZero
// Desc: 10보다 작은 숫자 앞에 0을 붙여 스트링으로 리턴한다.
// Param: 숫자 number
// Rtn: 스트링
StringUtil.insertZero = function(number) 
{
    if (number < 10) 
	{
		number = '0' + number;
	}
    return number;
};

////////////////////////////////////////////////////////////////////
// Func: trim
// Desc: 앞뒤 공백 제거
// Param: value 문자열
// Rtn: 앞뒤 공백 제거한 문자열
if(!String.prototype.trim)
{
	String.prototype.trim = function ()
	{
		return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
	};
}
StringUtil.trim = function(value)
{
	return value.trim();
};

////////////////////////////////////////////////////////////////////
// Func: prependStr
// Desc: 앞자리 문자열 붙이기
// Param: value 값
// Param: str   채울문자
// Param: digit 자릿수
// Rtn: 문자열
StringUtil.prependStr = function(value, str, digit)
{
	if(!value || !str || !digit)
		throw new Error('Invalid parameter');

	if(this.length >= digit)
		return value;

	str = new Array(1 + digit).join(str);

	return (str + value).slice(-str.length); // (value + str).slice(0, str.length)
};

////////////////////////////////////////////////////////////////////
// Func: dateFmt
// Desc: 날짜 형태 string 변경 (yyyy-MM-dd HH:mm:ss)
// Param: value   (필수) 값
// Param: toFmt   (선택) 변경될 date format
// Param: fromFmt (선택) 원본 date format
// Rtn: 문자열
StringUtil.dateFmt = function(org, toFmt, fromFmt)
{
	var value = org;

	if (toFmt == undefined)
		toFmt = 'yyyy-MM-dd HH:mm:ss';

	if (fromFmt == undefined)
		fromFmt = 'yyyyMMddHHmmss';

	if (fromFmt.length < value.length)
		value = value.substring(0, fromFmt.length);

	var d = Date.parseExact(value, fromFmt);

	if (d == null)
		return org;

	var dateStr = d.toString(toFmt);

	if (dateStr == null || dateStr == '')
		return org;

	return dateStr;
};

////////////////////////////////////////////////////////////////////
// Func: encrypt
// Desc: 암호화 (https://caligatio.github.io/jsSHA/, https://github.com/Caligatio/jsSHA)
// Param: value plain text
// Rtn: 암호화 된 문자열
StringUtil.encrypt = function(value)
{
	var result    = null;

	try
	{
		var shaObj = new UnikeyAIR();
		result = shaObj.sha256AndBase64(value);
	}
	catch(e)
	{
		console.log(e);
		result = '';
	}

	return result;
};

////////////////////////////////////////////////////////////////////
// Func: getDateDiff
// Desc: 두 날짜 간의 일수 차이 계산
// Param: s 시작일 Date
// Param: e 종료일 Date
// Rtn: 두 날짜 간의 일수
StringUtil.getDateDiff = function(s, e, format)
{
	format = format == undefined ? 'yyyyMMdd' : format,
	s = Date.parseExact(s, format),
	e = Date.parseExact(e, format);

	if(s == null || e == null)
	{
		return null;
	}

	return (e.getTime() - s.getTime()) / 1000 / 60 / 60 / 24;
};

////////////////////////////////////////////////////////////////////
// Func: hasRepeatStr
// Desc: 입력 받은 값의 연속된 문자의 포함여부를 체크
// Param: str 체크할 값
// Param: limit 자릿수
// Rtn: true 연속됨, false 연속되지 않음
StringUtil.hasRepeatStr = function(str, limit)
{
	var c, o, d, p,
		n = 0,
		l = limit == null ? 4 : limit;

	for(var i = 0; i < str.length; i++)
	{
		c = str.charCodeAt(i);

		if(i > 0 && (p = o - c) > -2 && p < 2 && (n = p == d ? n + 1 : 0) > l - 3)
			return true;

		d = p;
		o = c;
	}

	return false;
};

////////////////////////////////////////////////////////////////////
// Func: isFloat
// Desc: 입력 받은 값이 +,-,. 기호도 포함하여 숫자 여부 리턴
// Param: value 값
// Rtn: true 숫자, false 숫자 아닌 경우
StringUtil.isFloat = function(value)
{
	if(value && (typeof value).toLowerCase() == 'number')
		return true;

	return /^[+-]?[0-9]+(\.[0-9]+)?$/.test(value);
};

////////////////////////////////////////////////////////////////////
// Func: toFloat
// Desc: 입력 받은 값이 숫자일 경우 숫자형으로 리턴
// Param: value 값
// Rtn: float
StringUtil.toFloat = function(value, decimal)
{
	var value = StringUtil.isFloat(value) ? parseFloat(value) : 0;

	if(decimal == undefined)
		return value;

	var value2 = value.toString();

	if(value2.indexOf('.') > -1)
	{
		var tmp = value2.split('.');
		
		if(decimal == 0)
		{
			value2 = tmp[0];
		}
		else
		{
			tmp[1] = (tmp[1] + '0000000000000000').substring(0, decimal);
			value2 = tmp.join('.');
		}
	}
	
	return parseFloat(value2);
};

// 날짜형식인지 체크
StringUtil.isDate = function(value, format)
{
	value = value + '';

	if (!format)
		format = 'yyyyMMdd';

	return Date.parseExact(value, format) != null;
};

// 소숫점 이하 0 자리를 회색으로 처리하는 문자열 리턴
StringUtil.markGrayZerosBelowPoint = function(amtString, grayCode)
{
	var needGray = false;
	var needIndex = true;
	var strLen = amtString.length;
	
	var index = strLen;
	for (var i = strLen; i >= 0 ; i--)
	{
		var nowChar = amtString.substr(i - 1, 1);
		
		if (nowChar == '0')
		{
			
		}
		else if (nowChar == '.')
		{
			needGray = true;
			if (needIndex) index = i;
			needIndex = false;
			break;
		}
		else
		{
			if (needIndex) index = i;
			needIndex = false;
		}
		
	}

	var returnStr = amtString;
	
	if (needGray)
	{
		var prefix = amtString.substring(0, index);
		var suffix = amtString.substring(index, strLen);
		
		returnStr = prefix + '<font color=#' + grayCode + '>' + suffix + '</font>';
	}

	return returnStr;
}