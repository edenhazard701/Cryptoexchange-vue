BEGIN_FUNCTION_MAP
	.Func,(ac207)보안번호확인,ac207,headtype=A;
	BEGIN_DATA_MAP
		ac207In,입력,input;
		begin
			계정ID			, user_id			, user_id			, long  , 10;
			입력비밀번호		, iput_pass			, iput_pass			, char  , 64;
		end
		ac207Out,출력,output;
		begin
			계정ID			, user_id			, user_id			, long  , 10;
		end
	END_DATA_MAP
END_FUNCTION_MAP
