BEGIN_FUNCTION_MAP
	.Func,(ac414)계정별 적용수수료 조회,ac414,headtype=A;
	BEGIN_DATA_MAP
		ac414In,입력,input;
		begin
			계정ID		, user_id				, user_id				, long  , 10;
			요청건수		, req_cnt				, req_cnt           	, long	, 5;
		end
		ac414Out_c,출력공통,output;
		begin
			응답건수		, rsp_cnt				, rsp_cnt				, long	, 5;
		end
		ac414Out,출력,output,occurs;
		begin
			거래구분		, trd_tp				, trd_tp				, char		, 1;
			적용수수료율	, aplc_fee_rt			, aplc_fee_rt			, double	, 20;
		end
	END_DATA_MAP
END_FUNCTION_MAP
