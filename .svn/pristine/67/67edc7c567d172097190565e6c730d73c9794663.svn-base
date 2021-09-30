BEGIN_FUNCTION_MAP
	.Func,(ac145)휴대폰번호 변경,ac145,headtype=A;
	BEGIN_DATA_MAP
		ac145In,입력,input;
		begin
			계정ID				, user_id			, user_id			, char  , 10;
			인증휴대폰DI		, auth_di			, auth_di			, char  , 64;
			신규인증휴대폰번호	, af_auth_mobl_no	, af_auth_mobl_no	, char  , 20;
			휴대폰통신사		, mobl_corp			, mobl_corp			, char  ,  3;
			사용자성명			, user_nm			, user_nm			, char  , 50;
			생년월일			, user_brth_day		, user_brth_day		, char  ,  8;
			성별				, user_gend			, user_gend			, char  ,  1;
			내외국인구분		, user_forn_tp		, user_forn_tp		, char  ,  1;
		end
		ac145Out,출력,output;
		begin
			기존인증휴대폰번호	, bf_auth_mobl_no	, bf_auth_mobl_no	, char  , 20;
			신규인증휴대폰번호	, af_auth_mobl_no	, af_auth_mobl_no	, char  , 20;
		end
	END_DATA_MAP
END_FUNCTION_MAP
