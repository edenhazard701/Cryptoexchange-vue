BEGIN_FUNCTION_MAP
	.Func,(ac609)TDI히스토리,ac609,headtype=A;
	BEGIN_DATA_MAP
		ac609In,입력,input;
		begin
			진행구분			, proc_tp	 	  , proc_tp			, char		,   1;
			요청개수			, req_cnt		  , req_cnt			, int		,	5;
		end
		ac609Out_c,출력공통,output;
		begin
			응답건수 			, rsp_cnt		  , rsp_cnt         , long	    ,   5;
		end
		ac609Out,출력,output,occurs;
		begin
			통화코드	        , cur_cd		  , cur_cd			, char	    ,   5;
			통화명		    , cur_nm		  , cur_nm			, char   	,  30;
			통화영문명		    , cur_eng_nm	  , cur_eng_nm		, char   	,  30;
			판매시작일		    , sale_str_dt	  , sale_str_dt		, char   	,  12;
			판매제한일		    , sale_limt_dt	  , sale_limt_dt	, char   	,  12;
			판매종료일		    , sale_end_dt	  , sale_end_dt		, char   	,  12;
			참고1		   		, rmrk		  	  , rmrk			, char   	, 300;
			진행상태	  		, proc_stat		  , proc_stat		, char   	,   1;
			차수			    , seq		  	  , seq				, int   	,   1;
			진행상태명	    	, proc_stat_nm	  , proc_stat_nm	, char   	,  20;
			진행상태명(영문)    	, proc_stat_nm_en , proc_stat_nm_en	, char   	,  20;
			하드캡		    , hard_cp		  , hard_cp			, double   	,  20;
			소프트캡		    , soft_cp		  , soft_cp			, double   	,  20;
			참여수량		    , invo_qty		  , invo_qty		, double   	,  20;
			1차 원화가격	    , prmy_krw_prc	  , prmy_krw_prc	, long   	,  10;
			2차 원화가격	    , scnd_krw_prc	  , scnd_krw_prc	, long   	,  10;
			3차 원화가격	    , thrd_krw_prc	  , thrd_krw_prc	, long   	,  10;
			1차 하드캡		    , prmy_hard_cp	  , prmy_hard_cp	, double   	,  20;
			2차 하드캡		    , scnd_hard_cp	  , scnd_hard_cp	, double   	,  20;
			3차 하드캡		    , thrd_hard_cp	  , thrd_hard_cp	, double   	,  20;
			1차 참여수량	    , prmy_invo_qty	  , prmy_invo_qty	, double   	,  20;
			2차 참여수량	    , scnd_invo_qty	  , scnd_invo_qty	, double   	,  20;
			3차 참여수량	    , thrd_invo_qty	  , thrd_invo_qty	, double   	,  20;
			이벤트적용비율		, event_aply_rt   , event_aply_rt   , double   ,  10;
		end
	END_DATA_MAP
END_FUNCTION_MAP