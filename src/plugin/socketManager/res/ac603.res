BEGIN_FUNCTION_MAP
	.Func,(ac603)배당 전/당일 조회,ac603,headtype=A;
	BEGIN_DATA_MAP
		ac603In,입력,input;
		begin
			기준일자		, base_dt		, base_dt		, char		,	 8;
		end
		ac603Out,출력,output;
		begin
      		통화코드		, cur_cd		, cur_cd		, char		,	 5;   
			전일일자      	, bf_dt			, bf_dt     	, char		,	 8;
			전일 누적발행량	, bf_tot_qty	, bf_tot_qty	, double	,	20;
			전일 배당액   	, bf_dvd_amt	, bf_dvd_amt	, long		,	20;
			전일 배당 비율	, bf_dvd_rt		, bf_dvd_rt 	, long		,	20;
			당일일자      	, to_dt			, to_dt     	, char		,	 8;
			당일 누적발행량	, to_tot_qty	, to_tot_qty	, double	,	20;
			당일 배당액   	, to_dvd_amt	, to_dvd_amt	, long		,	20;
			당일 배당 비율	, to_dvd_rt		, to_dvd_rt 	, long		,	20;
			배당 비율		, dvd_rt		, dvd_rt 		, double	,	 5;
			현재 시분초		, sys_tm		, sys_tm		, char		,	 6;
		end
	END_DATA_MAP
END_FUNCTION_MAP
#endif