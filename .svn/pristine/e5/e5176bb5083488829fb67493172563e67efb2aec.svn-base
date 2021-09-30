BEGIN_FUNCTION_MAP
	.Func,(ac503)계정정보조회,ac503,headtype=A;
	BEGIN_DATA_MAP
		ac503In,입력,input;
		begin
			계정ID				, user_id			, user_id			, char  , 10;
		end
		ac503Out,출력,output;
		begin
			계정메일주소		, user_mail			, user_mail			, char  , 128;
			계정비밀번호		, user_pass			, user_pass			, char	, 128;
			인증휴대폰번호		, auth_mobl_no		, auth_mobl_no		, char  ,  64;
			사용자명 			, user_nm			, user_nm			, char	, 128;
			이벤트알림      	, event_noti    	, event_noti    	, char  ,   1;
			모바일인증구분  	, mobl_auth_tp  	, mobl_auth_tp  	, char  ,   1;
			보안인증구분    	, secu_auth_tp  	, secu_auth_tp  	, char  ,   1;
			계좌인증구분		, bact_auth_tp		, bact_auth_tp		, char	,   1;
			보안인증실패횟수	, fail_secu_cont	, fail_secu_cont	, long	, 3;
		end
	END_DATA_MAP
END_FUNCTION_MAP
