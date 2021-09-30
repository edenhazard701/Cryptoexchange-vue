BEGIN_FUNCTION_MAP
	.Func,(ac606)TDI참여코인 조회,ac606,headtype=A;
	BEGIN_DATA_MAP
		ac606In,입력,input;
		begin
			처리구분			, proc_tp		  , proc_tp			, char		,	1;
			요청개수			, req_cnt		  , req_cnt			, int		,	5;
		end
		ac606Out_c,출력공통,output;
		begin
			이벤트적용비율		, event_aply_rt   , event_aply_rt   , double   	,  10;
			응답건수 			, rsp_cnt		  , rsp_cnt         , long	    ,   5;
		end
		ac606Out,출력,output,occurs;
		begin
			통화코드	        , cur_cd		  , cur_cd			, char	    ,   5;
			통화명		    , cur_nm		  , cur_nm			, char   	,  30;
			통화영문명		    , cur_eng_nm	  , cur_eng_nm		, char   	,  30;
			시작일시    			, fr_dt   		  , fr_dt 		  	, char  	,  12;
			종료일시    			, to_dt	      	  , to_dt     		, char  	,  12;
			하드캡    			, hard_cp	      , hard_cp     	, double  	,  20;
			소프트캡    			, soft_cp	      , soft_cp     	, double  	,  20;
			차수    			, seq		      , seq		     	, int	  	,   1;
			참여수량    			, invo_qty	      , invo_qty     	, double  	,  20;
			상장상태    			, list_stat	      , list_stat     	, char  	,  20;
			상장상태(영문)  	, list_stat_en    , list_stat_en    , char  	,  20;
			종료상태    			, end_stat	      , end_stat     	, char  	,  20;
			종료상태(영문)		, end_stat_en	  , end_stat_en     , char  	,  20;
			비고1    			, rmrk	      	  , rmrk     		, char  	, 300;
			1차수량    			, prmy_qty	      , prmy_qty     	, double  	,  20;
			2차수량    			, scnd_qty	      , scnd_qty     	, double  	,  20;
			3차수량    			, thrd_qty	      , thrd_qty     	, double  	,  20;
			원화환산가격 		, krw_prc	      , krw_prc     	, long  	,  10;
			진행상태    			, proc_stat	      , proc_stat     	, char  	,  20;
			진행상태(영문)		, proc_stat_en	  , proc_stat_en    , char  	,  20;
		end
	END_DATA_MAP
END_FUNCTION_MAP