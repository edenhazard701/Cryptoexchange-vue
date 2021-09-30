BEGIN_FUNCTION_MAP
	.Func,(ac112)인증등급초기화요청,ac112,headtype=A;
	BEGIN_DATA_MAP
		ac112In,입력,input;
		begin
			계정ID		, user_id			, user_id			, char  , 10;
			인증종류	, auth_kind			, auth_kind			, char  , 2;
		end
		ac112Out,출력,output;
		begin
			계정ID		, user_id			, user_id			, char  , 10;
		end
	END_DATA_MAP
END_FUNCTION_MAP
