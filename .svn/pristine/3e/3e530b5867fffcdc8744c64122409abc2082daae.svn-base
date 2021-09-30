BEGIN_FUNCTION_MAP
	.Func,(ac415)거래금액별 수수료 조회,ac415,headtype=A;
	BEGIN_DATA_MAP
		ac415In,입력,input;
		begin
			요청건수           , req_cnt           , req_cnt           , long	, 5;
		end
		ac415Out_c,출력공통,output;
		begin
			응답건수 		, rsp_cnt			, rsp_cnt           , long	, 5;
		end
		ac415Out,출력,output,occurs;
		begin
			누적거래금액하한	, trd_amt_low_limt	, trd_amt_low_limt	, double	, 20;
			누적거래금액상한	, trd_amt_high_limt	, trd_amt_high_limt	, double	, 20;
			수수료율		, fee_rt			, fee_rt			, double  	, 20;
		end
	END_DATA_MAP
END_FUNCTION_MAP
