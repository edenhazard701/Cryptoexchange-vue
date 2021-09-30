/**
 * @author hjh
 */
//----------------------------------------------------------------------------------------------------
//보안키패드
//----------------------------------------------------------------------------------------------------

var SecurePadManager = {};

SecurePadManager.callbackFunc = null;
SecurePadManager.padWorkDone = function(code, data, len)
{
	SecurePadManager.callbackFunc(code, data, len);
	SecurePadManager.resetCallback()
};

SecurePadManager.callBackCheck = function(callback)
{
	if(SecurePadManager.callbackFunc) return false;
		
	SecurePadManager.callbackFunc = callback;
	return true;
};

SecurePadManager.resetCallback = function()
{
	SecurePadManager.callbackFunc = null;
};

//--------------------------------------------------------------------------------

//	패드 띄우기

//	@function getDeviceId(Object option, Function);
//  위치 ㅣ 로그인 화면 비밀번호 입력, 비밀번호 변경 (3군데) , 보안비밀번호 입력 , 보안 비밀번호 등록화면(2군데)
/*  option = 
	{
		title: '비밀번호 입력', 	//키패드 타이틀
		padType: 'char', 		   //키패드 타입('char'/'popup') * popup 숫자팝업 키패드이고 char는 문자팝업 키패드
		checkSpecial: true,        //유효성 검사 
		returnType: 1,			   //텍스트 표시형태(0:평문, 1:암호화값)  1의 경우엔 (길이, 암호화값) 형식으로 데이터가 옴
		maxLength: 16,			//max 길이
		minLength:8,			//min 길이
		genKey: null         //generateKey
	}

	{
		title: '비밀번호 입력', 	 //키패드 타이틀
		padType: 'popup', 			//키패드 타입('char'/'popup') * popup 숫자팝업 키패드이고 char는 문자팝업 키패드
		returnType: 1,			 //텍스트 표시형태(0:평문, 1:암호화값)  1의 경우엔 (길이, 암호화값) 형식으로 데이터가 옴
		maxLength: 4,			//max 길이
		minLength: 4,			//min 길이
		genKey: null         //generateKey
	}
*/ 
//	callback(int code, String data);

SecurePadManager.openPad = function( option, callback)
{
		
	//if(!afc.isIos) theApp.offLifeCycle = true;
	if(SecurePadManager.callBackCheck(callback))
	{
		cordova.exec(function(result){
			if(option.padType == "char")
			{
				if(result.state == "ing") 
				{
					callback(true, null, result.data, 'ing');
					return;
				}
				else if(result.state == "complete") 
				{
					if(result.data.length > 0)
					{
						var str = result.data.split(',');
						callback(true, str[1], str[0] , 'complete');
					}
					
				}
				else if(result.state == "cancle") callback(true, null, null,'cancel');
			}
			else
			{
				if(result.state == "ing") 
				{
					callback(true, null, result.data , 'ing'); 
					return;
				}
				else if(result.state == "complete") 
				{
					if(result.data.length > 0)
					{
						var str = result.data.split(',');
						callback(true, str[1], str[0] , 'complete');
					}
				}
				else if(result.state == "cancle") callback(true, null, null,'cancel');
			}

			SecurePadManager.resetCallback();
			
		}, null, "SecurePadPlugin", "openPad", [option]);
	}
};

SecurePadManager.closePopupPad = function()
{
	cordova.exec(null, null, "SecurePadPlugin", "closePopupPad", null);
};

SecurePadManager.getDeviceUUID = function(callback)
{
	cordova.exec(callback, null, "SecurePadPlugin", "getDeviceUUID", null);
	
};