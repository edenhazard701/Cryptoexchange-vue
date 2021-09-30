BEGIN_FUNCTION_MAP
	.Func,(ac130)로그인처리,ac130,headtype=A;
	BEGIN_DATA_MAP
		ac130In,입력,input;
		begin
			계정메일주소			, user_mail			, user_mail			, char  , 50;
			입력비밀번호			, iput_pass			, iput_pass			, char  , 64;
			입력보안비밀번호		, iput_secu_pass	, iput_secu_pass	, char  , 64;
			언어종류				, lang_kind			, lang_kind			, char	,  2;
		end
		ac130Out,출력,output;
		begin
			계정ID					, user_id			, user_id			, char  , 10;
			세션ID					, sesn_id			, sesn_id			, char	, 50;
			자동로그인키값			, auto_key			, auto_key			, char	, 72;
			임시비밀번호사용여부    , temp_use_tp       , temp_use_tp       , char  , 1;
			인증유효시간    		, vali_dtm      	, vali_dtm      	, char  , 14;
			자동감시주문약관동의	, auto_ord_terms	, auto_ord_terms	, char	, 1;
		end
	END_DATA_MAP
END_FUNCTION_MAP
