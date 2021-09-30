BEGIN_FUNCTION_MAP
	.Func,(ac613)거래소코인 소개 조회,ac613,headtype=A;
	BEGIN_DATA_MAP
		ac613In,입력,input;
		begin
			통화코드			, cur_cd			, cur_cd			, char		,	 5;
		end
		ac613Out,출력,output;
		begin
			통화코드				, cur_cd       		, cur_cd     		, char   	,	 5;
			통화명					, cur_nm       		, cur_nm      		, char    	, 	30;
			총 발행량				, tot_qty	  		, tot_qty			, double  	, 	20;
			총 채굴량				, tot_minn_qty 		, tot_minn_qty 		, double   	, 	20;
			운영 및 마케팅			, mrkt_qty 			, mrkt_qty 			, double   	, 	20;
			팀						, team_qty  		, team_qty			, double  	, 	20;
			트레이드 마이닝 비율	, minn_qty_rt		, minn_qty_rt 		, double  	, 	20;
			운영 및 마케팅 비율		, mrkt_qty_rt 		, mrkt_qty_rt 		, double   	, 	20;
			팀 비율					, team_qty_rt  		, team_qty_rt		, double  	, 	20;			
			수수료 비율				, fee_rt	   		, fee_rt 			, double    , 	 5;
		end
	END_DATA_MAP
END_FUNCTION_MAP
#endif