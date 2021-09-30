BEGIN_FUNCTION_MAP
	.Func,(ac605)발행현황(고객),ac605,headtype=A;
	BEGIN_DATA_MAP
		ac605In,입력,input;
		begin
			기준년월			, base_ym		  , base_ym			, char		,   6;
		end
		ac605Out_c,출력공통,output;
		begin
			통화코드	        , cur_cd		  , cur_cd			, char	    ,   5;	
			최근누적발행량 		, last_tot_qty	  , last_tot_qty    , double    ,  20;
			응답건수 			, rsp_cnt		  , rsp_cnt         , long	    ,   5;
		end
		ac605Out,출력,output,occurs;
		begin
			기준일시	        , base_dt		  , base_dt			, char	    ,  8;
			마이닝		    , minn_qty		  , minn_qty		, double    ,  20;
			운영 및 마케팅    		, mrkt_team_qty   , mrkt_team_qty   , double  	,  20;
			바이백    			, bybk_qty	      , bybk_qty     	, double  	,  20;
			일자별 발행량    		, day_qty	      , day_qty     	, double  	,  20;
			누적 발행량    		, tot_qty	      , tot_qty     	, double  	,  20;
		end
	END_DATA_MAP
END_FUNCTION_MAP
#endif