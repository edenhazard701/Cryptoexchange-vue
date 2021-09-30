BEGIN_FUNCTION_MAP
	.Func,(ac307)쿠폰구매가능금액조회,ac307,headtype=A;
	BEGIN_DATA_MAP
		ac307In,입력,input;
		begin
			계정ID		, user_id			, user_id			, long		, 10;
			구매통화코드	, buy_cur_cd		, buy_cur_cd		, char		, 5;
		end
		ac307Out,출력,output;
		begin
			구매가능금액	, able_buy_amt		, able_buy_amt		, double  	, 20;
			통화코드		, cur_cd			, cur_cd			, char		, 5;
		end
	END_DATA_MAP
END_FUNCTION_MAP
