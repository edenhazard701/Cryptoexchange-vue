BEGIN_FUNCTION_MAP
	.Func,(dw114)휴대폰 등록,dw114,headtype=A;
	BEGIN_DATA_MAP
		dw114In,입력,input;
		begin
			계정ID			, user_id			, user_id			, char  , 10;
			SMS인증번호		, sms_auth_no		, sms_auth_no		, char  , 6;
		end
		dw114Out,출력,output;
		begin
			DUMMY           , dummy      		, dummy         	, char  , 1;
		end
	END_DATA_MAP
END_FUNCTION_MAP
