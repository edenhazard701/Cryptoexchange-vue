BEGIN_FUNCTION_MAP
	.Func,(ac113)인증등급초기화확인,ac113,headtype=A;
	BEGIN_DATA_MAP
		ac113In,입력,input;
		begin
			계정ID			, user_id			, user_id			, long  , 10;
			인증종류		, auth_kind			, auth_kind			, char  , 2;
			인증번호		, iput_auth_no		, iput_auth_no		, char  , 6;
		end
		ac113Out,출력,output;
		begin
			계정ID		, user_id			, user_id			, long  , 10;
		end
	END_DATA_MAP
END_FUNCTION_MAP
