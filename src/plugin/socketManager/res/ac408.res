BEGIN_FUNCTION_MAP
	.Func,(ac408)출급수수료조회,ac408,headtype=A;
	BEGIN_DATA_MAP
		ac408In,입력,input;
		begin
	  	 	 통화코드 			, cur_cd			, cur_cd			, char  , 5;
		end
		ac408Out,출력,output;
		begin
			수수료형태			, fee_tp			, fee_tp			, char 		, 1;
			수수료율			, fee_rt			, fee_rt			, double	, 20;
		end
	END_DATA_MAP
END_FUNCTION_MAP
