BEGIN_FUNCTION_MAP
	.Func,(ac309)쿠폰환불,ac309,headtype=A;
	BEGIN_DATA_MAP
		ac309In,입력,input;
		begin
			계정ID		, user_id			, user_id			, long  , 10;
			쿠폰번호		, copn_no			, copn_no			, long  , 10;
			구매일시		, buy_dtm			, buy_dtm			, char	, 20;
		end
		ac309Out,출력,output;
		begin
			환불금액		, refd_amt			, refd_amt			, double  	, 20;
			통화코드		, cur_cd			, cur_cd			, char	  	, 5;
		end
	END_DATA_MAP
END_FUNCTION_MAP
