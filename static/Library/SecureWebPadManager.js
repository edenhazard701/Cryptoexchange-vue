/**
 * @author hjh
 */
//----------------------------------------------------------------------------------------------------
//보안키패드
//----------------------------------------------------------------------------------------------------

var SecureWebPadManager = {};


SecureWebPadManager.element = document.createElement('div');
SecureWebPadManager.element.setAttribute('id', "w2ui-popup-uniwebkey");

SecureWebPadManager.uniwebkey = null;
SecureWebPadManager.g_showMouseOver = true;  

SecureWebPadManager.callback = null;
SecureWebPadManager.option = null;

var keypadType = "PC";

/*  option = 
	{
		title: '비밀번호 입력', 	//키패드 타이틀
		padType: 'char', 	//키패드 타입('char'/'num'/'popup') 
		returnType: 1,		//텍스트 표시형태(0:평문, 1:암호화값)  1의 경우엔 (길이, 암호화값) 형식으로 데이터가 옴
		maxLength: 20,			//max 길이
		minLength: 4			//min 길이
	}
	!! 웹키패드에서는 이중에 returnType만 사용함

*/ 
SecureWebPadManager.openPad = function(option, callback)
{
// 	alert(option.padType);
	if(option)
	{
		var unikeyAir = theApp.qm.netIo.unikeyAIR;
		if(unikeyAir==null) {
			option.genKey = null;
		} else {
			if(option.genKey == undefined) option.genKey = null;
			else option.genKey = unikeyAir.genPassKey();
		}
		
		SecureWebPadManager.option = option;
	}
	if(callback) SecureWebPadManager.callback = callback;
	
	if (SecureWebPadManager.uniwebkey != null) {
		//		console.log('SecureWebPadManager.uniwebkey != null');
 	}
	
	var e;
	try {
		if(option.padType!="undefined" && option.padType=="num")
			keypadType = "NUMBER01";
		else
			keypadType = "PC";		// TYPE PC:PC용, PHONE:Phone 세로형, TABLET:Phone 가로형
	} catch (e) {
// 		alert(e);
	}
		
	var uniwebkey_url = "http://192.168.255.23:9401/uniwebkey/uniwebkey_ajax.jsp";
	
	//unikey업체에서 라이브 도메인 작업 후 풀 것!
	if(theApp.buildMode == 'Live') {
		uniwebkey_url = "https://www.bithumbpro.com/uniwebkey/uniwebkey_ajax.php";
		
		//추후에 문제되면 추가할 것
/*		if(location.hostname=='www.bithumbpro.com') {
			uniwebkey_url = "https://www.bithumbpro.com/uniwebkey/uniwebkey_ajax.php";
		} 
		else if(location.hostname.indexOf("bithumbpro.com")>-1) {
			uniwebkey_url = "https://bithumbpro.com/uniwebkey/uniwebkey_ajax.php";
		}*/
		
// 		uniwebkey_url = "http://www.bithumbpro.com:9401/uniwebkey/uniwebkey_ajax.jsp";
// 		uniwebkey_url = "http://121.156.70.201:9401/uniwebkey/uniwebkey_ajax.jsp";
	}
	
	var msgMinError = "최소 ##글자 이상 입력해야 합니다.";	// ## 이 nMin으로 대치됨
	var titleMsg = "입력 오류";
	var nMin = 8;
	
    var windowHeight = window.innerHeight;
    var windowWidth = window.innerWidth;
    var top = 0;
    var left = 0;
	var width = 0;
    var height = 0;


	// 01. UniWebKey_Control() 
	SecureWebPadManager.uniwebkey = new UniWebKey_Control();

	// 02. 설정
	if (keypadType == "PC") {
		top = (windowHeight-340)/2;
		left = (windowWidth-750)/2;
		SecureWebPadManager.uniwebkey.SetPosition(top, left, 750, 295); 	// PC
	} else if(keypadType=="NUMBER01") {
/*		top = SecureWebPadManager.uniwebkey.GetObjectTopByID("uniwebkey_input");		// 대상의 left
		left = SecureWebPadManager.uniwebkey.GetObjectLeftByID("uniwebkey_input");		// 대상의 top*/
		
// 		top += 80;	// height 만큰 낮춰준다.
		width = 340 * 0.8;
//		height = 350 * 0.8;
		height = 285 * 0.68;
		top = (windowHeight-width)/2;
		left = (windowWidth-height)/2;
		SecureWebPadManager.uniwebkey.SetPosition(top, left, width, height); 	// NUMBER01
	}
	
	SecureWebPadManager.uniwebkey.SetMessageMin(msgMinError, titleMsg, nMin);
	SecureWebPadManager.uniwebkey.SetCallbackFunction(SecureWebPadManager.keyboard_click, 
													  SecureWebPadManager.keyboard_close, 
													  SecureWebPadManager.keyboard_error,
													  SecureWebPadManager.keyboard_rearrange,
													  SecureWebPadManager.keyboard_show_after);
	
	// 03. PC 는 위쪽에 DIV 추가
	// id="uniwebkey_move_pos" ==> 키패드 이동 대상
	var passHtml = "";
	if(keypadType=="NUMBER01") {
		passHtml = 
		'<table style="border: 0px solid red; width:100%; margin: auto;padding:0">'+
		'    <tbody>'+
		'        <tr>'+
		'            <td valign="middle" style="width:10%">'+
		'                <img width="50px" height="32px" src="Assets/uniwebkey/images/number/cancel.png" border="0" onclick="cancel_keypad();" style="cursor:pointer">'+
		'            </td>'+
		'            <td id="uniwebkey_move_pos" style="width:80%;text-align:center">'+
		'                <input id="uniwebkey_input" type="text" name="" size="80" placeholder="비밀번호(4)" value="" readonly="" style="width:50%;font-size:14px; color:#515354;font-weight:bold;height:20px;text-align:center;border:1px solid #84a0d1;background:url(Assets/uniwebkey/images/password_bg.gif)">'+
		'            </td>'+
		'            <td valign="middle" style="width:10%">'+
		'                <img width="50px" height="32px" src="Assets/uniwebkey/images/number/done.png" border="0" onclick="done_keypad();" style="cursor:pointer">'+
		'            </td>'+
		'        </tr>'+
		'    </tbody>'+
		'</table>';
	} else {
		passHtml = 
			'<table style="border: 0px solid red; width:100%; margin: auto;padding:0">'+
			'    <tbody>'+
			'        <tr>'+
			'            <td valign="middle" style="width:8%">'+
			'            </td>'+
			'            <td id="uniwebkey_move_pos" style="width:90.2%;text-align:center">'+
			'                <input id="uniwebkey_input" type="text" name="" size="30" placeholder="비밀번호를 입력하세요" value="" readonly="" style="width:50%;font-size:14px; color:#515354;font-weight:bold;height:20px;text-align:center;border:1px solid #84a0d1;background:url(Assets/uniwebkey/images/password_bg.gif)">'+
			'            </td>'+
			'            <td valign="top" style="width:1.8%">'+
			'                <img src="Assets/uniwebkey/images/header_pc/keyboard_close_btn.png" border="0" onclick="SecureWebPadManager.close_keypad();" style="cursor:pointer">'+
			'            </td>'+
			'        </tr>'+
			'    </tbody>'+
			'</table>';
	}

	SecureWebPadManager.uniwebkey.SetHeaderDIV(passHtml);

	SecureWebPadManager.uniwebkey.ShowMouseOver(SecureWebPadManager.g_showMouseOver); 
	
	// sound 사용 시
	//SecureWebPadManager.uniwebkey.SetSound("Assets/uniwebkey/sound/click.ogg", "Assets/uniwebkey/sound/click.mp3");
	
	// 04. 가져올 키패드 종류와 URL 설정 ==> 가져온 다음 자동으로 시작한다.
	
	
	// 1. z index 조정
	//scrren lock z index 설정
	SecureWebPadManager.uniwebkey.SetZIndexLock(1); // 미설정시 7003
	//uniwebkey popup z index 설정
	SecureWebPadManager.uniwebkey.SetZIndexUniWebKey(1001); // 미설정시 7004
	
	SecureWebPadManager.uniwebkey.GetKeypad(keypadType, uniwebkey_url);

};


/**
 * uniwebkey 종료 : 필요 시 다른 함수 연동
 */
SecureWebPadManager.close_keypad = function()
{
	var e;
	try {
		if (SecureWebPadManager.uniwebkey != null) {
			SecureWebPadManager.uniwebkey.Close();
			SecureWebPadManager.callback(false);
			SecureWebPadManager.callback = null;
			SecureWebPadManager.option = null;
		}
	} catch(e){}
};

/**
 * uniwebkey 연동 callback 함수 샘플
 */
// 에러 전달
SecureWebPadManager.keyboard_error= function(errString) /* 에러 문자열 */
{
	console.log("웹 키보드 에러 발생\n\n"+errString);
};

// 클릭 event 전달 (버튼 클릭되면 이 함수를 호출해준다.)
// 다른 input box 에 표시할 때 사용
SecureWebPadManager.keyboard_click = function(plus_minus, curCount) /* 증가or감소, 현재문자수 */
{
//	console.log('keyboard_click()==>' + plus_minus>0?'증가':'감소' + ' CUR COUNT='+curCount);
	var v = document.getElementById('uniwebkey_input');
	v.value = "";
	for (var i=0;i<curCount;i++) {
		v.value = v.value + "*";
	}
	if(this.keypadType == "NUMBER01") {
		var v2 = document.getElementById('uniwebkey_input');
		v2.value = "";
		for (var i=0;i<curCount;i++) {
			v2.value = v2.value + "*";
		}
	}
};
// x 버튼 클릭 시 또는 완료 버튼 클릭 시 호출
SecureWebPadManager.keyboard_close = function(curCount) /* 현재문자수 */
{
	if (SecureWebPadManager.uniwebkey != null)
	{
		var nowPadLength = SecureWebPadManager.uniwebkey.GetInputLength();
		var max = SecureWebPadManager.option.maxLength;
		var min = SecureWebPadManager.option.minLength;
		
		if(nowPadLength > max || nowPadLength < min)
		{
// 			theApp.openMessageBox("비밀번호는 "+min+"자리 이상, "+max+"자리 이하로 입력해주세요.");
			theApp.openMessageBox("입력값은 "+min+ "~" +max+ "자리 입니다.");
			
			SecureWebPadManager.callback(true, null, 0);
			SecureWebPadManager.uniwebkey.ClearInput();
			SecureWebPadManager.callback = null;
			SecureWebPadManager.option = null;
			return;
		}
		if(SecureWebPadManager.option.returnType == "1")
		{
			if(SecureWebPadManager.option.checkSpecial) 
			{
				var rv = SecureWebPadManager.uniwebkey.IsValidPasswordType01();
				/*
				var ERR_NO_CHAR = 1;                // 문자 없음
				var ERR_NO_NUM = 2;                 // 숫자 없음
				var ERR_NO_SP = 3;                  // 특수문자 없음
				var ERR_SEQUNCE_3 = 4;              // 이어지는 3자리 (ex. 789, xyz etc.)
				var ERR_EQUAL_ARRAY_3 = 5;  // 나란한 3문자 (ex. 333, ccc etc.)
				var ERR_NO_DATA = 9;                // 데이터 없음
				*/
				if (rv != 0) {
					if (rv == 1 || rv == 2 || rv == 3) theApp.openMessageBox("영문, 숫자, 특수문자를 혼합하여 입력해주세요.");
                    else if (rv == 4) theApp.openMessageBox("이어지는 3자리는 사용할수 없습니다.(ex. 123, abc)");
                    else if (rv == 5) theApp.openMessageBox("나란한 3문자가 사용할수 없습니다.(ex. 333, ccc)");
                    else if (rv == 9) theApp.openMessageBox("데이터 없음.");
					
					SecureWebPadManager.callback(true, null, 0);
					SecureWebPadManager.uniwebkey.ClearInput();
					SecureWebPadManager.callback = null;
					SecureWebPadManager.option = null;
					return;
				}
			}
		
			//암호값 리턴
			var hashed_input;
			if(SecureWebPadManager.option.genKey == null) hashed_input = SecureWebPadManager.uniwebkey.GetHashedInputData(); // SHA256 And Base64 Value
			else hashed_input = SecureWebPadManager.uniwebkey.GetEncHashedInputData(SecureWebPadManager.option.genKey); // SHA256 And Base64 Value
			SecureWebPadManager.callback(true, hashed_input, curCount);
		}
		else
		{
			//평문값 리턴
			// 메모리 보안 적용 : 문자열은 한자씩 가져온다. 
			// ==> javascript 내부에는 입력 정보 전체가 평문상태로 존재하지 않음
			var inputLength = SecureWebPadManager.uniwebkey.GetInputLength();
			var inputData = "";
			var idx = 0;
			for (idx=0;idx<inputLength;idx++) {
				inputData += SecureWebPadManager.uniwebkey.GetInputData(idx);
			}
			
			SecureWebPadManager.callback(true, inputData, curCount);
		}

		// 메모리 clear
		SecureWebPadManager.uniwebkey.ClearInput();
		SecureWebPadManager.callback = null;
		SecureWebPadManager.option = null;

	} else {
		//alert("uniwebkey is null");
	}
};

// 재배열 버튼 눌렀을 때 호출 (재시작 하면 됨)
SecureWebPadManager.keyboard_rearrange = function()
{
	if(this.keypadType == "NUMBER01") {
		// 외부 입력도 clear
/*		var v2 = document.getElementById('html_input');
		v2.value = "";*/
		
		// 메모리 clear
/*		SecureWebPadManager.uniwebkey.ClearInput();
		SecureWebPadManager.callback = null;
		SecureWebPadManager.option = null;*/
	} 
	SecureWebPadManager.openPad();
};

//키보드 그려진 다음 바로 호출
SecureWebPadManager.keyboard_show_after = function()
{
	//console.log('keyboard_show_after()');
};

/**
 * multi-mouse 연동 샘플
 */
SecureWebPadManager.cur_multimouse = false;

SecureWebPadManager.keyboar_multimouse = function() {
	if (SecureWebPadManager.uniwebkey != null)
	{
		SecureWebPadManager.cur_multimouse = !SecureWebPadManager.cur_multimouse;
		SecureWebPadManager.uniwebkey.ShowMultiMouse(SecureWebPadManager.cur_multimouse);
	}
	
};

/**
 * 이미지 클릭 시 호출되는 함수 : 함수명 및 인자 고정!!!
 * ButtonClick 을 호출해 주어야 한다.
 */
function UniWebKey_ButtonClick(v) {
	if (SecureWebPadManager.uniwebkey != null)
	{
		if(this.keypadType == "NUMBER01") {
			var e;
			try {
				if ( (v=="back") || (v=="rearrange") ) {
					SecureWebPadManager.uniwebkey.ButtonClick(v);
					return;	
				} else 
				{
					// length check
					var REQ_INPUT_SIZE = 4;
					var inputLength = SecureWebPadManager.uniwebkey.GetInputLength();
					if (inputLength == REQ_INPUT_SIZE) {
	// 					alert("4자리까지만 입력");
//						SecureWebPadManager.callback(true, null, 0);
						SecureWebPadManager.uniwebkey.ClearInput();
//						SecureWebPadManager.callback = null;
//						SecureWebPadManager.option = null;
					}
				}
			} catch (e){}
		}
		SecureWebPadManager.uniwebkey.ButtonClick(v);
		//GetInputLength() 길이
	}
}

/**
 * uniwebkey 종료 : cancel
 */
function cancel_keypad()
{
	if (SecureWebPadManager.uniwebkey != null) {
		SecureWebPadManager.uniwebkey.Close();
		SecureWebPadManager.close_keypad();
	}
}

/*
 * uniwebkey 종료 : ok
 */
function done_keypad() 
{
	if (SecureWebPadManager.uniwebkey != null)
	{
		// 입력 길이 체크는 여기에서....
		var REQ_INPUT_SIZE = 4;

		var inputLength = SecureWebPadManager.uniwebkey.GetInputLength();
		if (inputLength != REQ_INPUT_SIZE) {
			alert("4자리가 입력되어야 합니다.");
			return;
		}
		number_keyboard_close(inputLength);
		SecureWebPadManager.uniwebkey.Close();
	} else {
		// error;
	}
}

// x 버튼 클릭 시 또는 완료 버튼 클릭 시 호출
function number_keyboard_close(curCount) /* 현재문자수 */
{
	var e;
	try{
		if (SecureWebPadManager.uniwebkey != null)
		{
			// 메모리 보안 적용 : 문자열은 한자씩 가져온다. 
			// ==> javascript 내부에는 입력 정보 전체가 평문상태로 존재하지 않음
			var inputLength = SecureWebPadManager.uniwebkey.GetInputLength();
			var max = SecureWebPadManager.option.maxLength;
			var min = SecureWebPadManager.option.minLength;

			if(inputLength > max || inputLength < min)
			{
	// 			theApp.openMessageBox("비밀번호는 "+min+"자리 이상, "+max+"자리 이하로 입력해주세요.");
				theApp.openMessageBox("보안비밀번호 "+min+"자리를 입력해주세요.");

				SecureWebPadManager.callback(true, null, 0);
				SecureWebPadManager.uniwebkey.ClearInput();
				SecureWebPadManager.callback = null;
				SecureWebPadManager.option = null;
				return;
			}

			var inputData = "";
			var idx = 0;
			for (idx=0;idx<inputLength;idx++) {
				inputData += SecureWebPadManager.uniwebkey.GetInputData(idx);
			}
			// var hashed_input = uniwebkey.GetHashedInputData(); // SHA256 And Base64 Value

			// neolook 20180219 check password validity
			var rv = SecureWebPadManager.uniwebkey.IsValidNumberType01();
			/*
			var ERR_NO_DATA = 9;                // 데이터 없음
			var ERR_NO_CHAR = 1;                // 문자 없음
			var ERR_NO_NUM = 2;                 // 숫자 없음
			var ERR_NO_SP = 3;                  // 특수문자 없음
			var ERR_SEQUNCE_3 = 4;              // 이어지는 3자리 (ex. 789, xyz etc.)
			var ERR_EQUAL_ARRAY_3 = 5;  // 나란한 3문자 (ex. 333, ccc etc.)
			var ERR_EQUAL_DATA_3 = 6;   // 동일한 3문자 포함 (ex. 1121 etc.)
			
			if (rv == 1 || rv == 2 || rv == 3) theApp.openMessageBox("영문, 숫자, 특수문자를 혼합하여 입력해주세요.");
                    else if (rv == 4) theApp.openMessageBox("이어지는 3자리는 사용할수 없습니다.(ex. 123, abc)");
                    else if (rv == 5) theApp.openMessageBox("나란한 3문자가 사용할수 없습니다.(ex. 333, ccc)");
                    else if (rv == 9) theApp.openMessageBox("데이터 없음.");
					
			*/
			if (rv != 0) {
				if (rv == 5) theApp.openMessageBox("나란한 3숫자가 사용할수 없습니다.(ex. 333)");
				else if (rv == 4) theApp.openMessageBox("이어지는 3자리는 사용할수 없습니다.(ex. 123)");
				else if (rv == 9) theApp.openMessageBox("데이터 없음.");
				
				SecureWebPadManager.callback(true, null, 0);
				SecureWebPadManager.uniwebkey.ClearInput();
				SecureWebPadManager.callback = null;
				SecureWebPadManager.option = null;
				return;
			}

			var hashed_input = SecureWebPadManager.uniwebkey.GetHashedInputData();

			// 메모리 clear
	// 		SecureWebPadManager.uniwebkey.ClearInput();

	// 		alert("INPUT DATA=["+inputData+"]\nHASH DATA=["+hashed_input+"]");

			//암호값 리턴
			var hashed_input;
			if(SecureWebPadManager.option.genKey == null) hashed_input = SecureWebPadManager.uniwebkey.GetHashedInputData(); // SHA256 And Base64 Value
			else hashed_input = SecureWebPadManager.uniwebkey.GetEncHashedInputData(SecureWebPadManager.option.genKey); // SHA256 And Base64 Value
			SecureWebPadManager.callback(true, hashed_input, curCount);

		} else {
	// 		alert("uniwebkey is null");
			// 메모리 clear
			SecureWebPadManager.uniwebkey.ClearInput();
			SecureWebPadManager.callback = null;
			SecureWebPadManager.option = null;
		}
	} catch(e) {}
}
