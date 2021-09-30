BEGIN_FUNCTION_MAP
	.Func,(ac301)전자지갑주소발급,ac301,headtype=A;
	BEGIN_DATA_MAP
		ac301In,입력,input;
		begin
			계정ID			, user_id		, user_id		, long  , 10;
			발급될통화코드		, cur_cd		, cur_cd		, char  , 5;
		end
		ac301Out,출력,output;
		begin
			발급된통화코드		, cur_cd		, cur_cd		, char  , 5;
			전자지갑주소		, walt_id		, walt_id		, char  , 256;
			보조필드			, sub_info		, sub_info		, char  , 50;
		end
	END_DATA_MAP
END_FUNCTION_MAP
