BEGIN_FUNCTION_MAP
	.Func,(ac108)OTP정보등록확인,ac108,headtype=A;
	BEGIN_DATA_MAP
		ac108In,입력,input;
		begin
			계정ID			, user_id		, user_id			, char  , 10;
			입력된OTP번호	, iput_otp		, iput_otp			, char  , 6;
		end
		ac108Out,출력,output;
		begin
			계정ID		, user_id			, user_id			, char  , 10;
		end
	END_DATA_MAP
END_FUNCTION_MAP
