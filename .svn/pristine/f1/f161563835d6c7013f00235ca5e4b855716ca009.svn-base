BEGIN_FUNCTION_MAP
	.Func,(ac604)나의 배당 내역 조회,ac604,headtype=A;
	BEGIN_DATA_MAP
		ac604In,입력,input;
		begin
			계정ID			, user_id         , user_id         , char      ,  10;
			요청개수			, req_cnt		  , req_cnt			, int		,	5;
		end
		ac604Out_c,출력공통,output;
		begin
			통화코드	        , cur_cd		  , cur_cd			, char	    ,   5;	
			평균보유수량 		, avg_poss_amt	  , avg_poss_amt    , double    ,  20;
			지분율 			, sta_rt		  , sta_rt        	, double    ,  20;
			예상 배당금 			, pdt_dvd		  , pdt_dvd         , long	    ,  20;
			응답건수 			, rsp_cnt		  , rsp_cnt         , long	    ,   5;
		end
		ac604Out,출력,output,occurs;
		begin
			기준일시	        , base_dtm		  , base_dtm		, char	    ,  14;
			배당비율		    , dvd_rt		  , dvd_rt			, long	    ,  20;
			배당금           		, dvd_amt	      , dvd_amt     	, long	  	,  20;
			배당수량           		, depo_amt	      , depo_amt     	, double  	,  20;
			배당지급통화코드		, dvd_pay_cur_cd  , dvd_pay_cur_cd  , char	  	,   5;
		end
	END_DATA_MAP
END_FUNCTION_MAP