BEGIN_FUNCTION_MAP
	.Func,(ac601)마이닝 전/당일 조회,ac601,headtype=A;
	BEGIN_DATA_MAP
		ac601In,입력,input;
		begin
			기준일자		, base_dt		, base_dt		, char		,	 8;
		end
		ac601Out,출력,output;
		begin
			통화코드		, cur_cd       	, cur_cd     	, char   	,	 5;
			전일일자		, bf_dt        	, bf_dt      	, char    	, 	 8;
			전일 채굴량		, bf_proc_qty  	, bf_proc_qty	, double  	, 	20;
			전일 거래금액	, bf_trd_amt   	, bf_trd_amt 	, long    	, 	20;
			전일 마이닝 비율	, bf_minn_rt   	, bf_minn_rt 	, double  	, 	20;
			당일일자		, to_dt        	, to_dt      	, char    	, 	 8;
			당일 채굴량		, to_proc_qty  	, to_proc_qty	, double  	, 	20;
			당일 거래금액	, to_trd_amt   	, to_trd_amt 	, long    	, 	20;
			당일 마이닝 비율	, to_minn_rt   	, to_minn_rt 	, double  	, 	20;
			현재 시분초		, sys_tm		, sys_tm		, char		,	 6;
		end
	END_DATA_MAP
END_FUNCTION_MAP
#endif