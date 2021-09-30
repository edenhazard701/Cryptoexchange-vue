BEGIN_FUNCTION_MAP
	.Func,(ac172)계정휴면해지신청,ac172,headtype=A;
	BEGIN_DATA_MAP
		ac172In,입력,input;
		begin
			계정ID				, user_id			, user_id			, char  , 10;
			인증휴대폰DI		, auth_di			, auth_di			, char  , 64;
		end
		ac172Out,출력,output;
		begin
			처리일시           , proc_dt			, proc_dt			, char  , 14;
		end
	END_DATA_MAP
END_FUNCTION_MAP
