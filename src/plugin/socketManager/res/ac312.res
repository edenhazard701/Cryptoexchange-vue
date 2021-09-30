BEGIN_FUNCTION_MAP
	.Func,(ac312)전자지갑출금 취소,ac312,headtype=A;
	BEGIN_DATA_MAP
		ac312In,입력,input;
		begin		
			계정ID			, user_id		, user_id		, long  , 10;
			거래일자      		, trd_dt      	, trd_dt      	, char  , 8;
			거래시각      		, trd_tm       	, trd_tm       	, char  , 12;
		end
		ac312Out,출력,output;
		begin
			DUMMY           , dummy      	, dummy         , char  , 1;
		end
	END_DATA_MAP
END_FUNCTION_MAP
