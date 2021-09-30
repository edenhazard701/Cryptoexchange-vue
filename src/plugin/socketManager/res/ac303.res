BEGIN_FUNCTION_MAP
	.Func,(ac303)내부지갑확인,ac303,headtype=A;
	BEGIN_DATA_MAP
		ac303In,입력,input;
		begin
			계정ID		, user_id			, user_id			, long  	, 10;
			통화코드		, cur_cd			, cur_cd			, char		, 5;
			입금전자지갑주소	, walt_id			, walt_id			, char		, 256;
			보조필드 		, sub_info			, sub_info			, char		, 50;
		end
		ac303Out,출력,output;
		begin
			지갑구분		, walt_tp			, walt_tp			, char  	, 1;
	END_DATA_MAP
END_FUNCTION_MAP
