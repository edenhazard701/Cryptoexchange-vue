BEGIN_FUNCTION_MAP
	.Func,(ac181)사전가입 SMS 발송요청,ac181,headtype=A;
	BEGIN_DATA_MAP
		ac181In,입력,input;
		begin
			계정메일주소       , user_mail           , user_mail           , char  , 50;
            휴대폰국가번호     , mobl_ctry          , mobl_ctry        , char  ,  8;       
            휴대폰번호        , auth_mobl_no       , auth_mobl_no         , char  ,  20;        
			언어종류          , lang_kind          , lang_kind         , char  ,  2;       
		end
		ac181Out,출력,output;
		begin
			계정메일주소      	, user_mail       	, user_mail        , char  , 10;
			SMS인증번호      , sms_auth_no       , sms_auth_no    , char  , 6;
			SMS처리시간  	 , sms_proc_time     , sms_proc_time  , char  , 14;
		end
	END_DATA_MAP
END_FUNCTION_MAP
