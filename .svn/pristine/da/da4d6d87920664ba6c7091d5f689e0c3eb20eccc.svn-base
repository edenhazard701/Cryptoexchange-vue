/* =============================================================================
 * System       : EXCHAIN
 * FileName     : exchain.js
 * Version      : 1.0
 * Description  : exchain script
 * Author       : 
 * Date         : 2019.02.12
 * -----------------------------------------------------------------------------
 * Modify Date  : 
 * -----------------------------------------------------------------------------
 * version 1.0 	: 
 * -----------------------------------------------------------------------------
 * Etc          : 
 * -----------------------------------------------------------------------------
 * Copyrights 2019 by Exchain. All rights reserved. ~ by Exchain.
 * =============================================================================
 */

var securityModule = function (ajaxObj , callback) {
	ajaxObj.fCallback = FSWSSCheckCheckCallback;   
	ajaxObj.pCallback = callback; 
    FSWSSCheck(ajaxObj); 
};

var FSWSSCheck = function (ajaxObj) {
	var returnObj 	    = new Object();
	returnObj.fwsCheck 	= false;
    $.ajax({
    	type: "GET",
    	timeout: 4500,
    	url: "https://local.flyhigh-x.com:52177/UpdateEngine?service_key=c8cee8ee39754a8aa7107f8b34213276",
			success: function(data) {	//설치되어있는 경우
				console.log("fssSusscss");
    		returnObj.fwsCheck = true;    		
    	},
		error:function(xhr, status, error) {
			console.log("fssFailer");
			returnObj.fwsCheck = false;    
		},
		complete:function(data) {
      if ( $.isFunction(ajaxObj.fCallback)) {
            	ajaxObj.fCallback(ajaxObj, returnObj);
			}
			
		}
    });
};


var FSWSSCheckCheckCallback = function (ajaxObj, resultObj) {

	if(typeof ajaxObj == "undefined" || typeof resultObj == "undefined") return;
	
	console.log('fsscheck', resultObj.fwsCheck);
	var fwscheck = resultObj.fwsCheck;
	
	if(fwscheck)  // true : fswss 설치됨
	{
		// 은행보안모듈 체크
		ajaxObj.bCallback = BANKSecurityCheckCallback;
		ajaxObj.fwscheck  = fwscheck;
		ajaxObj.pCallback = ajaxObj.pCallback;
		
		BANKSecurityCheck(ajaxObj);
	}
	else   //false : fswss 설치안됨
	{
	    ajaxObj.fwscheck  = fwscheck;  //false
	    ajaxObj.bankcheck = false;
	    
		var paramObj   = new Object();
    	paramObj.url   = ajaxObj.instPage;
	    paramObj.param = ajaxObj;
	    //COMM.progressbar("off");
	    
		if(ajaxObj.pCallback){   //callback 에 넣었던 함수 
	    	ajaxObj.pCallback(false);
	    }else{
	    }
	}
}


var BANKSecurityCheck = function (ajaxObj) {
	var returnObj 			= new Object();
	returnObj.bankCheck 	= false;
	returnObj.scrappingData = "";	//스크래핑 데이터

    $.ajax({
		type: "GET",
    	dataType : "jsonp",
		url: "https://local.flyhigh-x.com:52177/ScrapService?service_key=c8cee8ee39754a8aa7107f8b34213276&timeout=120" + "&sid=s9040603&bank_id=" + "01" + ajaxObj.bankId, //최종적으론 01004 형태로 넘어감
		success: function(data) {			
			console.log(">>> 은행보안모듈 설치" );
			console.log(data);			
			returnObj = data;
		},
		error:function(xhr, status, error) {
			console.log(">>> 은행보안모듈 설치 에러")
		},  
		complete:function(data) {
			console.log(">>> 은행보안모듈 완료요청" );
            if ( $.isFunction(ajaxObj.bCallback)) {
            	ajaxObj.bCallback(ajaxObj, returnObj);
            }
		}
	});    
};

var BANKSecurityCheckCallback = function (ajaxObj, resultObj) {
	console.log('BANKSecurityCheckCallback===>', ajaxObj);
	console.log('BANKSecurityCheckCallback===>', resultObj);
	
	if(typeof ajaxObj == "undefined" || typeof resultObj == "undefined") return;

    var instPage  = ajaxObj.instPage
    ,   nextPage  = ajaxObj.nextPage
    ,   bankId    = ajaxObj.bankId
    ,   fwscheck  = ajaxObj.fwscheck
    ,   bankcheck = false
    ,   count     = 0;
    
		var resultData = resultObj.list;
		console.log('resultData설치프로그램==>', resultData)
    
	$.each(resultData, function(index, obj) {
		if(obj.install != "Y")
			count = count +1 ;
	});

    ajaxObj.scrappingData = JSON.stringify(resultObj.list);
    
    var paramObj = new Object();
    
    if(count == 0)
    {
    	bankcheck = true;
    	paramObj.url = nextPage;
    }else
    {
    	bankcheck = false;
    	paramObj.url = instPage;
    }
    
    ajaxObj.fwscheck      = fwscheck;
    ajaxObj.bankcheck     = bankcheck;
    paramObj.param        = ajaxObj;

    if(ajaxObj.pCallback){
		ajaxObj.pCallback(true , bankcheck , ajaxObj.scrappingData);
    }else{
    }	
};


var isNumber = function (number) {
    var regExp = new RegExp(/^[0-9]*$/);
    
    if (!regExp.test(number))
        return false;
    
    return true;
};


var oneClickPro = function (paramObj, returnCallback) {
	var callbackfun = returnCallback;
	var scUrl = "https://local.flyhigh-x.com:52177/ScrapService";
					
	/*************************************************************************/
	/* 1. 원화(KRW)입금(스크래핑 시작) 처리합니다.                          
	/*************************************************************************/
	$.ajax({
		type: "POST",
		dataType: "jsonp",
		crossDomain: true,
		data: $.param(paramObj),
		url: scUrl,
		success: function(data){
			
			result = JSON.stringify(data);
			result = result.replace(/\\/gi, "");

			if(callbackfun){
				console.log('res==>555');
			}else{
				console.log('res==>666');
			}
			if(result.match('000') == '000') {
				/*************************************************************************/
		  		/* 3.1. 스크래핑 이체 성공시, 원화(KRW)입금 완료 페이지로 이동합니다.   							                 
				/*************************************************************************/
				callbackfun(true ,'000');
			} else if(result.match('001') == '001' && result.match('취소되었습니다') == '취소되었습니다') {
				/*************************************************************************/
		  		/* 3.1. 스크래핑 이체 취소시, 원화(KRW)입금 취소 페이지로 이동합니다.   
		  		/*      계좌비밀번호입력취소, 인증서로그인취소, 보안매체비밀번호입력취소, 전자서명취소 등							                
		  		/*************************************************************************/
				callbackfun(false ,'001',data.errCode, data.errMsg);
			} else {
				/*************************************************************************/
				/* 3.1. 스크래핑 처리중 오류 발생                             
				/*************************************************************************/
				callbackfun(false ,'002', data.errCode, data.errMsg);
				//failCallback(data.errCode, data.errMsg);
			}
		},
		error: function(e){
			callbackfun(false ,'003');
			//failCallback("", "스크래핑 실행 실패");
		}
	});
};

var failCallback = function (resultCd , resultMsg) {
	/*************************************************************************/
	/* 전자서명 직전, 스크래핑에서 보내주는 타임아웃 발생시	                 
	/*  - errCode : "9002", errMsg : <RESULT>N</RESULT>                      	
	/*************************************************************************/
	if(resultCd == "9002" || resultMsg == "<RESULT>N</RESULT>") {
		resultMsg = "이제요청 시간이 초과되었습니다.";
	}
	resultMsg = "[" + resultCd + "] " + resultMsg;
	
	var resultObj = new Object();
	resultObj.errMsg = resultMsg.replace(/\r\n/gi," ");
	
	/*************************************************************************/
	  /* 스크래핑 이체 오류시, 원화(KRW)입금 오류 페이지로 이동합니다.         
	  /*  - 파라미터 : 오류메시지								                
	  /*************************************************************************/
};
